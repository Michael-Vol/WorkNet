import React, { useEffect, useState } from 'react';
import { Row, Col, Panel, Avatar, Button } from 'rsuite';
import './UserItem.scss';
import { getAvatar } from '../../Actions/posts';
import { useDispatch } from 'react-redux';
import { selectApplicant } from '../../Actions/jobs';
const UserItem = ({ user, job }) => {
	const dispatch = useDispatch();
	const [avatar, setAvatar] = useState(null);

	const fetchAvatar = async () => {
		const res = await getAvatar(user._id);
		dispatch(res);
		setAvatar(res.payload.avatar);
	};
	const chooseApplicant = async () => {
		const res = await selectApplicant(job._id, user._id);
		dispatch(res);
	};
	useEffect(() => {
		fetchAvatar();
	});

	return (
		<span className='job--user--item--container'>
			<Panel>
				<Row className='job--user--avatar--container'>
					<Col md={12}>
						<Avatar className='job--user--avatar' src={`data:image/png;base64,${avatar}`} size='lg' circle></Avatar>
					</Col>
					<Col md={8}>
						{user.firstName} {user.lastName}
					</Col>
				</Row>
				<Row className='select--applicant--container'>
					<Col>
						<Button
							block
							appearance='primary'
							onClick={() => {
								chooseApplicant();
							}}>
							Select
						</Button>
					</Col>
				</Row>
			</Panel>
		</span>
	);
};

export default UserItem;
