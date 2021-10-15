import React, { useEffect, useState, useContext } from 'react';
import './Chats.scss';
import { Row, Col, FlexboxGrid, Avatar, Button, Input, InputGroup, Modal, Loader } from 'rsuite';
import UserItem from './UserItem';
import Message from './Message';
import { useSelector } from 'react-redux';
import moment from 'moment';
import ScrollToBottom from 'react-scroll-to-bottom';
import { getConnectedUsers } from '../../Actions/users';
import { useDispatch } from 'react-redux';
import SelectUserItem from './SelectUserItem';
import { getChats, addNewMessage, getMessages, resetChatMessages } from '../../Actions/chat';
import { getAvatar } from '../../Actions/posts';
import { Link } from 'react-router-dom';
import { SocketContext } from '../../Utils/socket';
const Chats = () => {
	const dispatch = useDispatch();
	const socket = useContext(SocketContext);

	const user = useSelector((state) => state.auth.user);
	const connectedUsers = useSelector((state) => state.users.connectedUsers);
	const chatId = useSelector((state) => state.chats.chatId);
	const userId = useSelector((state) => state.chats.userId);
	const chats = useSelector((state) => state.chats.chats);
	const loadingMessages = useSelector((state) => state.chats.loadingMessages);

	const [message, setMessage] = useState('');
	const [previousMessages, setPreviousMessages] = useState([]);
	const [messages, setMessages] = useState([]);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [createChat, setCreateChat] = useState(false);
	const [activeChat, setActiveChat] = useState(null);
	const [activeUser, setActiveUser] = useState(null);
	const [skippedMessages, setSkippedMessages] = useState(0);
	const [activeUserAvatar, setActiveUserAvatar] = useState(null);
	const [noPreviousMessages, setNoPreviousMessages] = useState(false);
	const [activeUserId, setActiveUserId] = useState('');
	const [typingTimer, setTypingTimer] = useState(null);
	const [amTyping, setAmTyping] = useState(false);
	const [friendTyping, setFriendTyping] = useState(false);

	const fetchConnectedUsers = async () => {
		const res = await getConnectedUsers();
		dispatch(res);
	};

	const fetchChats = async () => {
		const res = await getChats();
		dispatch(res);
		if (activeUserId === '' && res.payload.chats && res.payload.chats.length > 0) {
			setActiveUserId(
				typeof res.payload.chats[0].userOne === 'string'
					? res.payload.chats[0].userTwo._id
					: res.payload.chats[0].userOne._id
			);
		}
	};
	const fetchMessages = async (chatId, skip) => {
		const res = await getMessages(chatId, skip);
		if (res.payload.messages.length === 0) {
			setNoPreviousMessages(true);
		}
		setPreviousMessages((state) => [...res.payload.messages, ...state]);
		return dispatch(res);
	};
	const sendMessage = async () => {
		if (message !== '') {
			const newMessage = { message, creator: 'me', timestamp: moment() };
			setMessages([...messages, newMessage]);
			setMessage('');
			socket.emit('sendMessage', { message: newMessage, receiver: activeUserId }, (res) => {
				console.log('Got message');
			});
			const res = await addNewMessage(newMessage.message, activeChat._id);
			dispatch(res);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			sendMessage();
		}
	};
	const handleKeyUp = (e) => {
		window.clearTimeout(typingTimer);
		setTypingTimer(
			window.setTimeout(() => {
				setAmTyping(false);
			}, 1000)
		);
	};
	const handleKeyPress = (e) => {
		if (e.key !== 'Enter') {
			window.clearTimeout(typingTimer);
			setAmTyping(true);
		}
	};

	useEffect(() => {
		if (socket) {
			if (amTyping) {
				socket.emit('amTyping', { receiver: activeUserId }, (error) => console.log(error));
			} else {
				socket.emit('amNotTyping', { receiver: activeUserId }, (error) => console.log(error));
			}
		}
	}, [amTyping]);
	const changeActiveUser = (id) => {
		if (activeUserId !== id) {
			dispatch(resetChatMessages());
			setPreviousMessages([]);
			setMessages([]);
			setSkippedMessages(0);
			setNoPreviousMessages(false);
			setActiveUserId(id);
		}
	};

	useEffect(async () => {
		if (chatId) {
			setCreateChat(false);
			setActiveUserId(userId);
			await fetchChats();
		}
	}, [chatId]);

	useEffect(async () => {
		if (activeUser) {
			const res = await getAvatar(activeUser._id);
			dispatch(res);
			setActiveUserAvatar(res.payload.avatar);
		}
	}, [activeUser]);

	useEffect(async () => {
		if (chats) {
			const newActiveChat = chats.find((chat) => {
				return (
					(typeof chat.userOne === 'string' ? chat.userOne === activeUserId : chat.userOne._id === activeUserId) ||
					(typeof chat.userTwo === 'string' ? chat.userTwo === activeUserId : chat.userTwo._id === activeUserId)
				);
			});
			if (newActiveChat) {
				const user = typeof newActiveChat.userOne === 'string' ? newActiveChat.userTwo : newActiveChat.userOne;
				setActiveChat(newActiveChat);
				setActiveUser(user);
				await fetchMessages(newActiveChat._id, skippedMessages);
			}
		} else {
		}
	}, [activeUserId]);

	useEffect(async () => {
		if (user && socket) {
			socket.on('message', (receivedMessage) => {
				setMessages([
					...messages,
					{
						message: receivedMessage.message,
						creator: 'friend',
						timestamp: receivedMessage.timestamp,
					},
				]);
			});
		}
	}, [user, messages]);

	useEffect(async () => {
		if (user) {
			if (socket) {
				socket.on('userOnline', (receivedOnlineUsers) => {
					setOnlineUsers(receivedOnlineUsers);
				});
				socket.on('userOffline', (receivedOnlineUsers) => {
					setOnlineUsers(receivedOnlineUsers);
				});
				socket.on('isTyping', () => {
					setFriendTyping(true);
				});
				socket.on('isNotTyping', () => {
					setFriendTyping(false);
				});
			}
			await fetchConnectedUsers();
			await fetchChats();
		}
	}, [user]);

	return (
		<FlexboxGrid>
			<Modal show={createChat} onHide={() => setCreateChat(false)} className='create--chat--container'>
				<Modal.Header>
					<span className='createChat--header'>Select a User to Chat</span>
				</Modal.Header>
				<Modal.Body>
					{connectedUsers &&
						connectedUsers.map((user, index) => {
							return <SelectUserItem key={index} user={user} />;
						})}
				</Modal.Body>
			</Modal>
			<FlexboxGrid.Item colspan={5} className='user--flex--container'>
				<Row className='new--chat--container'>
					<Col>
						<Button block className='new--chat--btn' appearance='primary' onClick={() => setCreateChat(true)}>
							New Chat
						</Button>
					</Col>
				</Row>
				{chats &&
					chats.map((chat, index) => {
						const friend = typeof chat.userOne === 'string' ? chat.userTwo : chat.userOne;
						const userActive = onlineUsers.some((userId) => friend._id === userId);
						return (
							<UserItem onClick={changeActiveUser} userActive={userActive} chat={chat} user={friend} key={index} />
						);
					})}
			</FlexboxGrid.Item>
			{chats &&
				(chats.length === 0 ? (
					<FlexboxGrid.Item colspan={19} className='no-chats--flex--container'>
						<Row className='no-chats--container'>
							<Col>
								<i className='fas fa-meh fa-3x'></i>
								<div className='no-chats--text'>No Chats</div>
								<div>
									<Button
										className='no-chats--chat--btn'
										appearance='primary'
										onClick={() => setCreateChat(true)}>
										Chat with a Friend
									</Button>
								</div>
							</Col>
						</Row>
					</FlexboxGrid.Item>
				) : (
					<FlexboxGrid.Item colspan={19} className='chats--flex--container'>
						<Row className='chat--header--container'>
							<Col md={2} className='header--avatar--container'>
								<Avatar
									circle
									src={`data:image/png;base64,${activeUserAvatar}`}
									className='active--user--avatar'
								/>
							</Col>
							<Col md={18} className='header--info--container'>
								<span>{activeUser && activeUser.firstName.concat(' ').concat(activeUser.lastName)} </span>
							</Col>
							<Col md={4} className='visit--profile'>
								<Button appearance='ghost' className='visit--profile--btn'>
									{activeUserId && <Link to={`/users/${activeUserId}/profile`}>Visit Profile</Link>}
								</Button>
							</Col>
						</Row>
						<ScrollToBottom className='chat--body--container'>
							{!noPreviousMessages && (
								<Link to='#' className='load--more--container'>
									<Row
										onClick={() => {
											fetchMessages(activeChat._id, skippedMessages + 10);
											setSkippedMessages(skippedMessages + 10);
										}}>
										<i className='fas fa-chevron-up load--more--icon'></i>
										<span className='load--more--link'>Load More</span>
									</Row>
								</Link>
							)}
							{chats && chats.length > 0 && loadingMessages ? (
								<Loader size='lg' content='Fetching Messages' className='messages--loader' />
							) : (
								previousMessages &&
								previousMessages.map((message, index) => {
									return <Message previous message={message} key={index} mine={message.sender === user._id} />;
								})
							)}
							{messages &&
								messages.map((message, index) => {
									return <Message message={message} key={index} mine={message.creator === 'me'} />;
								})}
							{previousMessages.length > 0 && friendTyping && (
								<div className='typing-indicator clearfix'>
									<span></span>
									<span></span>
									<span></span>
								</div>
							)}
						</ScrollToBottom>

						<Row className='chat--footer--container'>
							<Col className='text--input--container'>
								<InputGroup className='text--input--group'>
									<Input
										className='text--input'
										value={message}
										placeholder='Write a message...'
										onChange={(value) => setMessage(value)}
										onKeyDown={(e) => handleKeyDown(e)}
										onKeyPress={(e) => handleKeyPress(e)}
										onKeyUp={(e) => handleKeyUp(e)}
									/>
									<Button
										className='send--message--btn'
										appearance='primary'
										onClick={() => {
											sendMessage();
										}}>
										Send
										<i className='fas fa-paper-plane send--icon'></i>
									</Button>
								</InputGroup>
							</Col>
						</Row>
					</FlexboxGrid.Item>
				))}
		</FlexboxGrid>
	);
};

export default Chats;
