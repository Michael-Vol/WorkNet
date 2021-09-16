import React, { useEffect, useState } from 'react';
import './Network.scss';

import { getUsers, getConnectedUsers } from '../../Actions/users';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, InputGroup, Input, Icon } from 'rsuite';
import UserItem from './UserItem';
const Network = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [connectedUsers, setConnectedUsers] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	useEffect(async () => {
		if (user) {
			const getUsersResponse = await getUsers({ includePersonalInfo: true });
			const getConnectedUsersResponse = await getConnectedUsers();
			dispatch(getUsersResponse);
			dispatch(getConnectedUsersResponse);
			setUsers(getUsersResponse.payload.users);
			setFilteredUsers(getUsersResponse.payload.users);
			setConnectedUsers(getConnectedUsersResponse.payload.users);
		}
	}, [user]);

	const searchUsers = (value) => {
		setIsSearching(true);
		setSearchValue(value);
		setFilteredUsers([]);
		users.forEach((user) => {
			const fullName = user.firstName + ' ' + user.lastName;
			if (fullName.toLowerCase().includes(value)) {
				setFilteredUsers((filteredUsers) => [...filteredUsers, user]);
			}
		});
	};

	useEffect(() => {
		if (searchValue === '') {
			setIsSearching(false);
		}
	}, [searchValue]);

	return (
		<Container className='network--container'>
			<Row className='search--container' gutter={10}>
				<Col md={22} className='search'>
					<InputGroup>
						<Input placeholder='Search All Users' onChange={(value) => searchUsers(value)} />
						<InputGroup.Button>
							<Icon icon='search' />
						</InputGroup.Button>
					</InputGroup>
				</Col>
			</Row>
			<Row className='users--container' gutter={4}>
				{isSearching && filteredUsers && (
					<div>
						<div className='items--header'>All Users</div>

						{filteredUsers.map((usr, index) => {
							if (usr._id !== user._id) return <UserItem user={usr} key={index} id={`userItem-${index}`} />;
						})}
					</div>
				)}
			</Row>
			<Row className='users--container' gutter={4}>
				{!isSearching && connectedUsers && (
					<div>
						<div className='items--header'>Connected Users</div>
						{connectedUsers.map((usr, index) => {
							if (usr._id !== user._id)
								return <UserItem user={usr} key={index} id={`connected-userItem-${index}`} />;
						})}
					</div>
				)}
			</Row>
		</Container>
	);
};

export default Network;
