import React from 'react';
import { Container, List } from 'rsuite';
import './Notifications.scss';
const Notifications = () => {
	console.log('in notifications');
	return (
		<Container className='notifications--container'>
			<List className='notifications--list'>
				<List.Item className='notifications--item--container'>
					<div className='notifications--item'>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate, velit.
					</div>
				</List.Item>
				<List.Item className='notifications--item--container'>
					<div className='notifications--item'>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate, velit.
					</div>
				</List.Item>
				<List.Item className='notifications--item--container'>
					<div className='notifications--item'>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate, velit.
					</div>
				</List.Item>
				<List.Item className='notifications--item--container'>
					<div className='notifications--item'>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate, velit.
					</div>
				</List.Item>
			</List>
		</Container>
	);
};

export default Notifications;
