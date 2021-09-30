import React, { useEffect, useState } from 'react';
import { List, FlexboxGrid, Button, ButtonGroup, Avatar } from 'rsuite';
import './NotificationItem.scss';
import { getAvatar } from '../../Actions/posts';
import { updateRequest } from '../../Actions/connectRequests';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
const NotificationItem = ({ notification }) => {
	const dispatch = useDispatch();
	const [avatar, setAvatar] = useState(null);
	const [redirect, setRedirect] = useState(false);
	const fetchAvatar = async (userId) => {
		const res = await getAvatar(userId);
		dispatch(res);
		setAvatar(res.payload.avatar);
	};

	const respondToRequest = async (accept) => {
		const res = await updateRequest(notification.sender._id, accept);
		dispatch(res);
	};

	useEffect(async () => {
		await fetchAvatar(notification.sender._id);
	}, []);

	return (
		<List.Item className='notifications--item--container'>
			{redirect && <Redirect to={`/users/${notification.sender._id}/profile`} />}
			<FlexboxGrid className='notifications--item'>
				<FlexboxGrid.Item colspan={4} className='avatar' onClick={() => setRedirect(true)}>
					<Avatar circle src={`data:image/png;base64,${avatar}`} size='lg' />
				</FlexboxGrid.Item>
				<FlexboxGrid.Item colspan={14} className='sender'>
					<span>
						{notification.sender.firstName.concat(' ').concat(notification.sender.lastName)} wants to connect with you
					</span>
				</FlexboxGrid.Item>
				<FlexboxGrid.Item colspan={4} className='connnect-btns'>
					<ButtonGroup vertical className='connect-btns'>
						<Button appearance='primary' className='accept' onClick={async () => respondToRequest(true)}>
							Accept
						</Button>
						<Button appearance='ghost' onClick={async () => respondToRequest(false)}>
							Reject
						</Button>
					</ButtonGroup>
				</FlexboxGrid.Item>
			</FlexboxGrid>
		</List.Item>
	);
};

export default NotificationItem;
