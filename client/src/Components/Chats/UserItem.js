import React, { useState } from 'react';
import { Row, Col, Avatar, Badge } from 'rsuite';
import { useHistory } from 'react-router-dom';
import './UserItem.scss';

const UserItem = ({ chatActive, userActive = false }) => {
	const history = useHistory();

	const selectUser = () => {
		history.push(`/chats/61363089a3d67a1964c6db85`);
	};

	const activeClass = chatActive ? 'user--active' : '';
	const activeBadge = userActive ? 'user--online' : 'user--offline';
	return (
		<Row className={`chat--user--container ${activeClass}`} onClick={selectUser}>
			<Row>
				<Col md={6} className='user--avatar--container'>
					<Avatar circle />
					<Badge className={`${activeBadge}`} />
				</Col>
				<Col md={14} className='user--name--container'>
					<Row> FirstName LastName</Row>
					<Row className='text--preview'>
						<Col>Sample Message</Col>
					</Row>
				</Col>
			</Row>
			<Row className='divider'></Row>
		</Row>
	);
};

export default UserItem;
