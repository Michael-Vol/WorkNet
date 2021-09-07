import React, { useEffect, useState } from 'react';
import './Network.scss';

import { getUsers } from '../../Actions/users';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, InputGroup, Input, Icon } from 'rsuite';
import UserItem from './UserItem';
const Network = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	useEffect(async () => {
		if (user) {
			console.log('fetching users');
			const res = await getUsers({ includePersonalInfo: true });
			dispatch(res);
			setUsers(res.payload.users);
			console.log(res.payload.users);
		}
	}, [user]);

	const [users, setUsers] = useState([]);
	return (
		<Container className='network--container'>
			<Row className='search--container' gutter={10}>
				<Col md={22} className='search'>
					<InputGroup>
						<Input />
						<InputGroup.Button>
							<Icon icon='search' />
						</InputGroup.Button>
					</InputGroup>
				</Col>
			</Row>
			<Row className='users--container' gutter={4}>
				{users && users.map((user, index) => <UserItem user={user} key={index} />)}
			</Row>
		</Container>
	);
};

export default Network;
