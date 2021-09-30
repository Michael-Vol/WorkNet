import React, { useEffect, useState } from 'react';
import { Row, Panel, Avatar } from 'rsuite';
import './FriendItem.scss';
import { getAvatar } from '../../Actions/posts';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const FriendItem = ({ friend }) => {
	const dispatch = useDispatch();
	const [avatar, setAvatar] = useState(null);

	const user = useSelector((state) => state.auth.user);
	const friendId = friend._id;
	const fetchAvatar = async () => {
		const res = await getAvatar(friend._id);
		dispatch(res);
		setAvatar(res.payload.avatar);
	};

	useEffect(() => {
		if (user) {
			fetchAvatar();
		}
	}, [user]);

	return (
		<Link onClick={() => (window.location.href = `/users/${friendId}/profile`)}>
			<span className='friend--item--container'>
				<Panel>
					<Row className='friend--avatar--container'>
						<Avatar className='friend--avatar' src={`data:image/png;base64,${avatar}`} size='lg' circle></Avatar>
					</Row>
					<Row className='friend--name--container'>
						{friend.firstName} {friend.lastName}
					</Row>
				</Panel>
			</span>
		</Link>
	);
};

export default FriendItem;
