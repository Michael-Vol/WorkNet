import React, { useEffect, useState } from 'react';
import './UserItem.scss';
import { Col, Row, Panel, Avatar } from 'rsuite';
import { getAvatar } from '../../Actions/posts';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
const UserItem = ({ user, id }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [avatar, setAvatar] = useState(null);

	useEffect(async () => {
		const res = await getAvatar(user._id);
		dispatch(res);
		setAvatar(res.payload.avatar);
	}, []);

	const forwardToProfile = () => {
		history.push(`/users/${user._id}/profile`);
	};
	return (
		<Col md={6} sm={24} xs={24} className='user--panel--container' id={id} onClick={forwardToProfile}>
			<Panel className='user--panel'>
				<Row className='header'>
					<span>{`${user.firstName} ${user.lastName}`}</span>
				</Row>
				<Row className='avatar'>
					<Avatar circle src={`data:image/png;base64,${avatar}`} size='lg' />
				</Row>
				<Row className='info'>
					{user.workExperience.length > 0 ? (
						<div>Position: {user.workExperience[0].name}</div>
					) : (
						<div>Position: None </div>
					)}
				</Row>
				<Row className='info'>
					{user.workExperience.length > 0 ? (
						<div>Employer: {user.workExperience[0].employer}</div>
					) : (
						<div>Employer: None </div>
					)}
				</Row>
			</Panel>
		</Col>
	);
};

export default UserItem;
