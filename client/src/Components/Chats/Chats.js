import React, { useEffect, useState, useRef } from 'react';
import './Chats.scss';
import { Row, Col, FlexboxGrid, Avatar, Button, Input, InputGroup, Modal } from 'rsuite';
import UserItem from './UserItem';
import Message from './Message';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import moment from 'moment';
import ScrollToBottom from 'react-scroll-to-bottom';
import { getConnectedUsers } from '../../Actions/users';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SelectUserItem from './SelectUserItem';
import { getChats, addNewMessage, getMessages } from '../../Actions/chat';
import { getAvatar } from '../../Actions/posts';
import { Link } from 'react-router-dom';

const Chats = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const user = useSelector((state) => state.auth.user);
	const connectedUsers = useSelector((state) => state.users.connectedUsers);
	const chatId = useSelector((state) => state.chats.chatId);
	const userId = useSelector((state) => state.chats.userId);
	const chats = useSelector((state) => state.chats.chats);
	const previousMessages = useSelector((state) => state.chats.messages);

	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [createChat, setCreateChat] = useState(false);
	const [activeChat, setActiveChat] = useState(null);
	const [activeUser, setActiveUser] = useState(null);
	const [activeUserAvatar, setActiveUserAvatar] = useState(null);
	const activeUserId = window.location.pathname.replace('/chats/', '');
	const socketRef = useRef();
	const fetchConnectedUsers = async () => {
		const res = await getConnectedUsers();
		dispatch(res);
	};

	const fetchChats = async () => {
		const res = await getChats();
		dispatch(res);
	};
	const fetchMessages = async (chatId) => {
		const res = await getMessages(chatId);
		dispatch(res);
	};
	const sendMessage = async () => {
		if (message !== '') {
			const newMessage = { message, creator: 'me', timestamp: moment() };
			setMessages([...messages, newMessage]);
			setMessage('');
			socketRef.current.emit('sendMessage', { message: newMessage, receiver: activeUserId }, (error) => {
				console.log(error);
			});
			const res = await addNewMessage(newMessage.message, activeChat._id);
			dispatch(res);
			console.log(res.payload);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			sendMessage();
		}
	};

	useEffect(async () => {
		if (chatId) {
			setCreateChat(false);
			history.push(`/chats/${userId}`);
			await fetchChats();
		}
	}, [chatId]);

	useEffect(async () => {
		if (activeUser) {
			const res = await getAvatar(activeUser._id);
			dispatch(res);
			setActiveUserAvatar(res.payload);
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
				setActiveUser(user);
			}
			console.log(newActiveChat._id);
			await fetchMessages(newActiveChat._id);
		}
	}, [activeUserId]);
	useEffect(() => {
		if (chats && chats.length > 0) {
			const chatId = typeof chats[0].userOne === 'string' ? chats[0].userTwo._id : chats[0].userOne._id;
			const user = typeof chats[0].userOne === 'string' ? chats[0].userTwo : chats[0].userOne;
			history.push(`/chats/${chatId}`);
			setActiveChat(chats[0]);
			setActiveUser(user);
		}
	}, [chats]);

	useEffect(async () => {
		if (user) {
			await fetchConnectedUsers();
			await fetchChats();

			const newSocket = io('http://localhost:5000', { transports: ['websocket'] });
			socketRef.current = newSocket;
			socketRef.current.emit('join', { userId: user._id }, (error) => {
				console.log(error);
			});

			socketRef.current.on('message', (receivedMessage) => {
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
				{/* <UserItem chatActive userActive /> */}
				{chats &&
					chats.map((chat, index) => {
						const friend = typeof chat.userOne === 'string' ? chat.userTwo : chat.userOne;
						return <UserItem user={friend} key={index} />;
					})}
			</FlexboxGrid.Item>
			<FlexboxGrid.Item colspan={19} className='chats--flex--container'>
				<Row className='chat--header--container'>
					<Col md={2} className='header--avatar--container'>
						<Avatar circle src={`data:image/png;base64,${activeUserAvatar}`} className='active--user--avatar' />
					</Col>
					<Col md={18} className='header--info--container'>
						<span>{activeUser && activeUser.firstName.concat(' ').concat(activeUser.lastName)} </span>
					</Col>
					<Col md={4} className='visit--profile'>
						<Button appearance='ghost' className='visit--profile--btn'>
							<Link to={`/users/${activeUserId}/profile`}>Visit Profile</Link>
						</Button>
					</Col>
				</Row>
				<ScrollToBottom className='chat--body--container'>
					{previousMessages &&
						previousMessages.map((message, index) => {
							return <Message previous message={message} key={index} mine={message.sender === user._id} />;
						})}
					{messages &&
						messages.map((message, index) => {
							return <Message message={message} key={index} mine={message.creator === 'me'} />;
						})}
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
		</FlexboxGrid>
	);
};

export default Chats;
