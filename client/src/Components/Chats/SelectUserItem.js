import React, { useState, useEffect } from 'react';
import { Row, Col, Avatar, Button } from 'rsuite';
import { getAvatar } from '../../Actions/posts';
import { useDispatch } from 'react-redux';
import { createNewChat } from '../../Actions/chat';
import './SelectUserItem.scss';

const SelectUserItem = ({ user }) => {
	const [avatar, setAvatar] = useState(null);
	const dispatch = useDispatch();

	const selectUser = async () => {
		const res = await createNewChat(user._id);
		dispatch(res);
	};
	useEffect(async () => {
		const res = await getAvatar(user._id);
		dispatch(res);
		setAvatar(res.payload.avatar);
	}, []);

	return (
		<Row className='chat--user--container'>
			<Row>
				<Col md={6} className='user--avatar--container'>
					<Avatar circle src={`data:image/png;base64,${avatar}`} className='select--user--avatar' />
				</Col>
				<Col md={14} className='user--name--container'>
					<Row> {user.firstName.concat(' ').concat(user.lastName)}</Row>
				</Col>
				<Col md={2}>
					<Button appearance='primary' onClick={selectUser}>
						Chat
					</Button>
				</Col>
			</Row>
		</Row>
	);
};

export default SelectUserItem;
