import React, { useState, useEffect } from 'react';
import { List, FlexboxGrid, Button, ButtonGroup, Avatar } from 'rsuite';
import { getAvatar } from '../../Actions/posts';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { readReaction } from '../../Actions/posts';
import './NotificationItem.scss';
const ReactionItem = ({ reaction, category }) => {
	const dispatch = useDispatch();

	const [redirect, setRedirect] = useState(false);
	const [avatar, setAvatar] = useState(null);

	const user = useSelector((state) => state.auth.user);

	const fetchAvatar = async (userId) => {
		const res = await getAvatar(userId);
		dispatch(res);
		setAvatar(res.payload.avatar);
	};

	const respondToReaction = async () => {
		const res = await readReaction(reaction._id);
		dispatch(res);
	};

	useEffect(() => {
		if (user) {
			fetchAvatar(reaction.creator._id);
		}
	}, [user]);

	return (
		<List.Item className='notifications--item--container'>
			{redirect && <Redirect to={`/users/${reaction.creator._id}/profile`} />}
			<FlexboxGrid className='notifications--item'>
				<FlexboxGrid.Item colspan={4} className='avatar' onClick={() => setRedirect(true)}>
					<Avatar circle src={`data:image/png;base64,${avatar}`} size='lg' />
				</FlexboxGrid.Item>
				<FlexboxGrid.Item colspan={14} className='sender'>
					<span>
						{reaction.creator.firstName.concat(' ').concat(reaction.creator.lastName)} has{' '}
						{category === 'like' ? 'liked' : 'commented on'} your post
					</span>
				</FlexboxGrid.Item>
				<FlexboxGrid.Item colspan={4} className='connnect-btns'>
					<ButtonGroup vertical className='connect-btns'>
						<Button appearance='primary' className='accept' onClick={async () => respondToReaction()}>
							Ok
						</Button>
					</ButtonGroup>
				</FlexboxGrid.Item>
			</FlexboxGrid>
		</List.Item>
	);
};

export default ReactionItem;
