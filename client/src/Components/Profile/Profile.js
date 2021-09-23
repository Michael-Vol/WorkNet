import React, { useEffect, useState } from 'react';

import './Profile.scss';
import { getPersonalInfo } from '../../Actions/personalInfo';
import { connectRequest, getConnectRequestStatus } from '../../Actions/connectRequests';
import { getAvatar } from '../../Actions/posts';
import { Container, FlexboxGrid, Avatar, Row, Nav, Button, List, Loader, Tag } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { toast, Toaster } from 'react-hot-toast';

const Profile = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const personalInfo = useSelector((state) => state.personalInfo);
	const connectRequestState = useSelector((state) => state.connectRequest);

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

		setAvatar(resAvatar.payload);
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
	const getStatus = async () => {
		const res = await getConnectRequestStatus(userId);
		dispatch(res);
		console.log(res);
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
							personalInfo.workExperience.map((work) => (
								<List>
									<List.Item className='item--container work--container'>
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
							<Row>
								<Button
									className={`connect-btn ${requestButtonStatus}`}
									appearance='primary'
									disabled={requestStatus !== ''}
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
								<div className='header'>{personalInfo.name}</div>
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
