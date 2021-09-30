import React, { useEffect, useState } from 'react';

import './Profile.scss';
import { getPersonalInfo } from '../../Actions/personalInfo';
import { connectRequest, getConnectRequestStatus } from '../../Actions/connectRequests';
import { getAvatar } from '../../Actions/posts';
import { Container, FlexboxGrid, Avatar, Row, Nav, Button, List, Loader, Tag, Divider, Placeholder } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { toast, Toaster } from 'react-hot-toast';
import { getFriends } from '../../Actions/users';
import { useHistory } from 'react-router';
import FriendItem from './FriendItem';

const Profile = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const user = useSelector((state) => state.auth.user);
	const personalInfo = useSelector((state) => state.personalInfo);
	const friends = useSelector((state) => state.users.friends);
	const friendsLoading = useSelector((state) => state.users.friendsLoading);

	const [currentCategory, setCurrentCategory] = useState('Work Experience');
	const [avatar, setAvatar] = useState(null);
	const [requestStatus, setRequestStatus] = useState('');
	const [requestButtonStatus, setRequestButtonStatus] = useState('');
	const userId = window.location.pathname.split('/')[2];

	const fetchPersonalInfo = async (userId) => {
		const resInfo = await getPersonalInfo(userId);
		const resAvatar = await getAvatar(userId);
		dispatch(resInfo);
		dispatch(resAvatar);

		setAvatar(resAvatar.payload.avatar);
	};

	const connectWithUser = async () => {
		const res = await connectRequest(userId);
		dispatch(res);
		if (res.payload.isAxiosError) {
			toast.error(res.payload.response.data.message);
		} else if (res.payload.request) {
			toast.success('Connect Request Sent!');
			setRequestStatus('Request Sent');
			setRequestButtonStatus('connect-btn--pending');
		}
	};

	const fetchFriends = async () => {
		const res = await getFriends(userId);
		dispatch(res);
	};
	const getStatus = async () => {
		const res = await getConnectRequestStatus(userId);
		dispatch(res);
		if (res.payload.status === 'Pending') {
			setRequestStatus('Request Pending');
			setRequestButtonStatus('connect-btn--pending');
		} else if (res.payload.status === 'Accepted') {
			setRequestStatus('Friends');
			setRequestButtonStatus('connect-btn--friends');
		}
	};
	useEffect(async () => {
		if (user) {
			await fetchPersonalInfo(userId);
			await getStatus();
			await fetchFriends();
		}
	}, [user]);

	const displayInfo = () => {
		let jsx = '';
		switch (currentCategory) {
			case 'Work Experience':
				jsx = (
					<div>
						{personalInfo.workExperience.length === 0 ? (
							<div className='no--info--container'>
								<div>
									<i className='fas fa-info-circle fa-lg'></i>
								</div>
								{personalInfo.name} hasn't posted any info on Work Experience.
							</div>
						) : (
							personalInfo.workExperience.map((work, index) => (
								<List>
									<List.Item className='item--container work--container' key={index}>
										<div>
											<div className='list--item--header'>
												Work Title: {work.name}
												<span className='list--item--visibility'>
													{work.visible ? (
														<Tag color='blue'>Public</Tag>
													) : (
														<Tag color='orange'>Private</Tag>
													)}
												</span>
											</div>
											<div className='list--item--sector'>Employer: {work.employer}</div>
											<div className='list--item--description'>{work.description}</div>
										</div>
									</List.Item>
								</List>
							))
						)}
					</div>
				);
				break;
			case 'Education':
				jsx = (
					<div>
						{personalInfo.education.length === 0 ? (
							<div className='no--info--container'>
								<div>
									<i className='fas fa-info-circle fa-lg'></i>
								</div>
								{personalInfo.name} hasn't posted any info on Education.
							</div>
						) : (
							<List>
								{personalInfo.education.map((edu) => (
									<List.Item className='item--container education--container'>
										<div>
											<div className='list--item--header'>
												Study Field: {edu.name}
												<span className='list--item--visibility'>
													{edu.visible ? (
														<Tag color='blue'>Public</Tag>
													) : (
														<Tag color='orange'>Private</Tag>
													)}
												</span>
											</div>
											<div className='list--item--sector'>University: {edu.university}</div>
											<div className='list--item--description'>{edu.university}</div>
										</div>
									</List.Item>
								))}
							</List>
						)}
					</div>
				);
				break;
			case 'Skills':
				jsx = (
					<div>
						{personalInfo.skills.length === 0 ? (
							<div className='no--info--container'>
								<div>
									<i className='fas fa-info-circle fa-lg'></i>
								</div>
								{personalInfo.name} hasn't posted any info on Skills.
							</div>
						) : (
							<List>
								{personalInfo.skills.map((skill) => (
									<List.Item className='item--container skills-container'>
										<div>
											<div className='list--item--header'>
												{skill.name}
												<span className='list--item--visibility'>
													{skill.visible ? (
														<Tag color='blue'>Public</Tag>
													) : (
														<Tag color='orange'>Private</Tag>
													)}
												</span>
											</div>
										</div>
									</List.Item>
								))}
							</List>
						)}
					</div>
				);
				break;
			default:
				return;
		}
		return jsx;
	};

	return (
		<Container className='profile--container'>
			<Toaster position='top-right' toastOptions={{ duration: 2000 }} />
			<FlexboxGrid justify='start' className='profile--flex--container'>
				<FlexboxGrid.Item colspan={4}></FlexboxGrid.Item>
				<FlexboxGrid.Item colspan={16} className='profile--main--container'>
					{personalInfo.loading ? (
						<Loader size='lg' content='Fetching Personal Info' className='loader' />
					) : (
						<div>
							<Row className='main--info--container'>
								<Row>
									<div
										className='back--button'
										onClick={() => {
											history.goBack();
										}}>
										<i className='fas fa-arrow-left fa-2x back--button--arrow'></i>
									</div>
									<Button
										className={`connect-btn ${requestButtonStatus}`}
										appearance='primary'
										disabled={requestStatus !== '' || user.isAdmin}
										onClick={() => {
											connectWithUser();
										}}>
										{requestStatus !== '' ? (
											<div>
												<i className='fas fa-check status--icon'></i>
												<span>{requestStatus}</span>
											</div>
										) : (
											'Connect'
										)}
									</Button>
								</Row>
								<Row className='profile--container profile--avatar--container'>
									<Avatar circle className='profile--avatar' src={`data:image/png;base64,${avatar}`} />
								</Row>
								<Row className='profile--container header--container'>
									<div className='name--header'>{personalInfo.name}</div>
								</Row>
							</Row>
							<Row className='section--header'>
								<span>Friends</span>
								<Divider className='section--header--divider' />
							</Row>
							{friendsLoading ? (
								<Row className='profile--container profile--friends--container'>
									<div>
										<Placeholder.Grid rows={1} columns={5} active />
									</div>
								</Row>
							) : friends.length === 0 ? (
								<div>
									<i className='fas fa-users-slash fa-2x'></i>
									<div className='no--friends'>{personalInfo.name} is not connected with any users.</div>
								</div>
							) : (
								<Row className='profile--container profile--friends--container'>
									{friends.map((friend, index) => (
										<FriendItem key={index} friend={friend} />
									))}{' '}
								</Row>
							)}
							<Row className='section--header'>
								<span>Personal Info</span>
								<Divider className='section--header--divider' />
							</Row>
							<Row className='profile--container profile--body--container'>
								<Nav className='profile--navbar' appearance='tabs' justified>
									<Nav.Item
										active
										className='active-tab'
										onSelect={() => setCurrentCategory('Work Experience')}>
										Work Experience
									</Nav.Item>
									<Nav.Item onSelect={() => setCurrentCategory('Education')}>Education</Nav.Item>
									<Nav.Item onSelect={() => setCurrentCategory('Skills')}>Skills</Nav.Item>
								</Nav>
								<div className='info--container'>{personalInfo.name && displayInfo()}</div>
							</Row>
						</div>
					)}
				</FlexboxGrid.Item>
				<FlexboxGrid.Item colspan={4}></FlexboxGrid.Item>
			</FlexboxGrid>
		</Container>
	);
};

export default Profile;
