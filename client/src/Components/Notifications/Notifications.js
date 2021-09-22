import React, { useEffect } from 'react';
import { Container, List, Divider } from 'rsuite';
import './Notifications.scss';
import { getMyRequests } from '../../Actions/connectRequests';
import { getReactions } from '../../Actions/posts';
import { useSelector, useDispatch } from 'react-redux';
import NotificationItem from './NotificationItem';
import ReactionItem from './ReactionItem';
const Notifications = ({ reactions }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const myRequests = useSelector((state) => state.connectRequest.requests);
	const myReactions = useSelector((state) => state.posts.reactions);
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
			{!myRequests && !myReactions ? (
				<div className='no--notifications'>No Notifications</div>
			) : (
				<List className='notifications--list'>
					{myRequests && myRequests.map((request, index) => <NotificationItem notification={request} key={index} />)}
					<Divider className='notifications--divider' />
					{myReactions &&
						myReactions.likes.map((like, index) => <ReactionItem reaction={like} category='like' key={index} />)}
					{myReactions &&
						myReactions.comments.map((comment, index) => (
							<ReactionItem reaction={comment} category='comment' key={index} />
						))}
				</List>
			)}
		</Container>
	);
};

export default Notifications;
