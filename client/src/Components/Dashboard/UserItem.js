import React, { useState, useEffect } from 'react';
import './UserItem.scss';
import { Row, Col, Avatar } from 'rsuite';
import { getAvatar } from '../../Actions/posts';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
const UserItem = ({ user }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [avatar, setAvatar] = useState([]);
	useEffect(async () => {
		const res = await getAvatar(user._id);
		dispatch(res);
		if (res.status !== 400) {
			setAvatar(res.payload.avatar);
		}
	}, []);
	return (
		<Row
			className='users--list--user'
			onClick={() => {
				return history.push(`/users/${user._id}/profile`);
			}}>
			<Col md={8} className='users--user--avatar'>
				<Avatar circle src={`data:image/png;base64,${avatar}`} />
			</Col>
			<Col md={2} className='users--user--info'>
				<div>
					<span>
						{user.firstName} {user.lastName}
					</span>
				</div>
			</Col>
		</Row>
	);
};

export default UserItem;
