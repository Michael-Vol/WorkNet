import React, { useState, useEffect } from 'react';
import { Row, Col, Avatar, Badge } from 'rsuite';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAvatar } from '../../Actions/posts';

import './UserItem.scss';

const UserItem = ({ chat, user, chatActive, onClick, userActive = false }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const me = useSelector((state) => state.auth.user);

	const [avatar, setAvatar] = useState(null);

	useEffect(async () => {
		const res = await getAvatar(user._id);
		dispatch(res);
		setAvatar(res.payload.avatar);
	}, []);

	const activeClass = chatActive ? 'user--active' : '';
	const activeBadge = userActive ? 'user--online' : 'user--offline';
	return (
		<Row
			className={`chat--user--container ${activeClass}`}
			onClick={() => {
				onClick(user._id);
			}}>
			<Row>
				<Col md={6} className='user--avatar--container'>
					<Avatar circle src={`data:image/png;base64,${avatar}`} className='select--user--avatar' />
					<Badge className={`${activeBadge}`} />
				</Col>
				<Col md={14} className='user--name--container'>
					<Row> {user.firstName.concat(' ').concat(user.lastName)}</Row>
					<Row className='text--preview'>
						<Col>
							{me && chat && chat.lastMessage && (
								<span className='last--message'>
									{chat.lastMessage.sender === me._id ? 'You' : user.firstName} : {chat.lastMessage.body}
								</span>
							)}
						</Col>
					</Row>
				</Col>
			</Row>
			<Row className='divider'></Row>
		</Row>
	);
};

export default UserItem;
