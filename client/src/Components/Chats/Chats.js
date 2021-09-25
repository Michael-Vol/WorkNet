import React, { useEffect } from 'react';
import './Chats.scss';
import { Row, Col, FlexboxGrid, Avatar, Button, Input } from 'rsuite';
import UserItem from './UserItem';
import Message from './Message';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const socket = io();
const Chats = () => {
	const user = useSelector((state) => state.auth.user);
	useEffect(() => {
		if (user) {
			socket.emit('join', { user: user._id }, (error) => {
				console.log(error);
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
					<Message />
					<Message mine />
					<Message />
					<Message />
					<Message mine />
					<Message />
					<Message />
					<Message mine />
					<Message />
					<Message mine />
					<Message />
					<Message mine />
					<Message />
					<Message />
					<Message mine />
					<Message />
					<Message />
				</Row>
				<Row className='chat--footer--container'>
					<Col className='text--input--container' md={20}>
						<Input className='text--input' placeholder='Write a message...' />
					</Col>
					<Col className='send--message--container' md={2}>
						<Button className='send--message--btn' appearance='primary'>
							Send
						</Button>
					</Col>
				</Row>
			</FlexboxGrid.Item>
		</FlexboxGrid>
	);
};

export default Chats;
