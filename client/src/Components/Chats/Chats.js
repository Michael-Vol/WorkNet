import React, { useEffect, useState, useRef } from 'react';
import './Chats.scss';
import { Row, Col, FlexboxGrid, Avatar, Button, Input } from 'rsuite';
import UserItem from './UserItem';
import Message from './Message';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const Chats = () => {
	const user = useSelector((state) => state.auth.user);
	const [message, setMessage] = useState('');
	// const [socket, setSocket] = useState(null);
	const [messages, setMessages] = useState([]);
	const activeUserId = window.location.pathname.replace('/chats/', '');
	const socketRef = useRef();

	const sendMessage = async () => {
		const messageToSend = message;
		setMessages([...messages, { message, creator: 'me' }]);
		setMessage('');
		socketRef.current.emit('sendMessage', { message: messageToSend, receiver: activeUserId }, (error) => {
			console.log(error);
		});
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			sendMessage();
		}
	};
	useEffect(() => {
		console.log(messages);
	}, [messages]);
	useEffect(() => {
		if (user) {
			const newSocket = io('http://localhost:5000', { transports: ['websocket'] });
			console.log(newSocket);
			// setSocket(newSocket);
			socketRef.current = newSocket;
			newSocket.emit('join', { userId: user._id }, (error) => {
				console.log(error);
			});

			socketRef.current.on('message', (receivedMessage) => {
				console.log(messages);
				setMessages([
					...messages,
					{
						message: receivedMessage.message,
						creator: 'friend',
					},
				]);
			});
		}
	}, [user]);
	return (
		<FlexboxGrid>
			<FlexboxGrid.Item colspan={5} className='user--flex--container'>
				<UserItem chatActive userActive />
				<UserItem />
				<UserItem userActive />
				<UserItem />
				<UserItem userActive />
				<UserItem />
				<UserItem />
				<UserItem userActive />
				<UserItem />
				<UserItem userActive />
				<UserItem />
			</FlexboxGrid.Item>
			<FlexboxGrid.Item colspan={19} className='chats--flex--container'>
				<Row className='chat--header--container'>
					<Col md={2} className='header--avatar--container'>
						<Avatar circle />
					</Col>
					<Col md={18} className='header--info--container'>
						<span>FirstName LastName </span>
					</Col>
					<Col md={4} className='visit--profile'>
						<Button appearance='ghost' className='visit--profile--btn'>
							Visit Profile
						</Button>
					</Col>
				</Row>
				<Row className='chat--body--container'>
					{messages &&
						messages.map((message, index) => {
							return <Message message={message} key={index} mine={message.creator === 'me'} />;
						})}
				</Row>
				<Row className='chat--footer--container'>
					<Col className='text--input--container' md={20}>
						<Input
							value={message}
							className='text--input'
							placeholder='Write a message...'
							onChange={(value) => setMessage(value)}
							onKeyDown={(e) => handleKeyDown(e)}
						/>
					</Col>
					<Col className='send--message--container' md={2}>
						<Button
							className='send--message--btn'
							appearance='primary'
							onClick={() => {
								sendMessage();
							}}>
							Send
						</Button>
					</Col>
				</Row>
			</FlexboxGrid.Item>
		</FlexboxGrid>
	);
};

export default Chats;
