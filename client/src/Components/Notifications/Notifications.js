import React, { useEffect } from 'react';
import { Container, List } from 'rsuite';
import './Notifications.scss';
import { getMyRequests } from '../../Actions/connectRequests';
import { useSelector, useDispatch } from 'react-redux';
import NotificationItem from './NotificationItem';
const Notifications = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const myRequests = useSelector((state) => state.connectRequest.requests);
	const fetchRequests = async () => {
		const res = await getMyRequests('Pending');
		dispatch(res);
	};

	useEffect(async () => {
		if (user) {
			await fetchRequests();
		}
	}, [user]);

	return (
		<Container className='notifications--container'>
			{myRequests && myRequests.length === 0 ? (
				<div className='no--notifications'>No Notifications</div>
			) : (
				<List className='notifications--list'>
					{myRequests && myRequests.map((request, index) => <NotificationItem notification={request} key={index} />)}
				</List>
			)}
		</Container>
	);
};

export default Notifications;
