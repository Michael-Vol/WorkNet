import React, { useEffect, useState } from 'react';
import './Network.scss';

import { getUsers } from '../../Actions/users';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, InputGroup, Input, Icon } from 'rsuite';
import UserItem from './UserItem';
const Network = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);

	useEffect(async () => {
		if (user) {
			console.log('fetching users');
			const res = await getUsers({ includePersonalInfo: true });
			dispatch(res);
			setUsers(res.payload.users);
			setFilteredUsers(res.payload.users);
		}
	}, [user]);

	const searchUsers = (value) => {
		setFilteredUsers([]);
		users.forEach((user) => {
			const fullName = user.firstName + ' ' + user.lastName;
			if (fullName.toLowerCase().includes(value)) {
				setFilteredUsers((filteredUsers) => [...filteredUsers, user]);
			}
		});
	};

	return (
		<Container className='network--container'>
			<Row className='search--container' gutter={10}>
				<Col md={22} className='search'>
					<InputGroup>
						<Input onChange={(value) => searchUsers(value)} />
						<InputGroup.Button>
							<Icon icon='search' />
						</InputGroup.Button>
					</InputGroup>
				</Col>
			</Row>
			<Row className='users--container' gutter={4}>
				{filteredUsers &&
					filteredUsers.map((usr, index) => {
						if (usr._id !== user._id) return <UserItem user={usr} key={index} id={`userItem-${index}`} />;
					})}
			</Row>
		</Container>
	);
};

export default Network;
