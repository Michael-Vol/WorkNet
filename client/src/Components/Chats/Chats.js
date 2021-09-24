import React from 'react';
import './Chats.scss';
import { Row, Col, FlexboxGrid, Divider } from 'rsuite';
import UserItem from './UserItem';
const Chats = () => {
	return (
		<FlexboxGrid>
			<FlexboxGrid.Item colspan={5} className='user--flex--container'>
				<UserItem chatActive userActive />
				<UserItem />
				<UserItem userActive />
				<UserItem />
				<UserItem userActive />
				<UserItem />
			</FlexboxGrid.Item>
			<FlexboxGrid.Item colspan={19} className='chats--flex--container'></FlexboxGrid.Item>
		</FlexboxGrid>
	);
};

export default Chats;
