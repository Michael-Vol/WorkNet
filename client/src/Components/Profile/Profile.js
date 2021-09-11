import React, { useEffect, useState } from 'react';

import './Profile.scss';
import { getPersonalInfo } from '../../Actions/personalInfo';
import { Container, FlexboxGrid, Avatar, Row, Nav, Button, List } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
const Profile = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const personalInfo = useSelector((state) => state.personalInfo);
	const [currentCategory, setCurrentCategory] = useState('Work Experience');

	const fetchPersonalInfo = async (userId) => {
		const res = await getPersonalInfo(userId);
		dispatch(res);
	};

	useEffect(async () => {
		if (user) {
			const userId = window.location.pathname.split('/')[2];
			await fetchPersonalInfo(userId);
		}
	}, [user]);

	const displayInfo = () => {
		let jsx = '';
		switch (currentCategory) {
			case 'Work Experience':
				console.log(personalInfo);
				jsx = (
					<List>
						{personalInfo.workExperience.map((work) => (
							<List.Item className='item--container work--container'>
								<div>
									<div className='list--item--header'>Work Title: {work.name}</div>
									<div className='list--item--sector'>Employer: {work.employer}</div>
									<div className='list--item--description'>{work.description}</div>
								</div>
							</List.Item>
						))}
					</List>
				);
				break;
			case 'Education':
				jsx = (
					<List>
						{personalInfo.education.map((edu) => (
							<List.Item className='item--container education--container'>
								<div>
									<div className='list--item--header'>Study Field: {edu.name}</div>
									<div className='list--item--sector'>University: {edu.university}</div>
									<div className='list--item--description'>{edu.university}</div>
								</div>
							</List.Item>
						))}
					</List>
				);
				break;
			case 'Skills':
				jsx = (
					<List>
						{personalInfo.skills.map((skill) => (
							<List.Item className='item--container skills-container'>
								<div>
									<div className='list--item--header'>{skill.name}</div>
								</div>
							</List.Item>
						))}
					</List>
				);
				break;
		}
		console.log(jsx);
		return jsx;
	};

	return (
		<Container className='profile--container'>
			<FlexboxGrid justify='start' className='profile--flex--container'>
				<FlexboxGrid.Item colspan={4}></FlexboxGrid.Item>
				{personalInfo.loading ? (
					<h1>Loading</h1>
				) : (
					<FlexboxGrid.Item colspan={16} className='profile--main--container'>
						<Row>
							<Button className='connect-btn' appearance='primary'>
								Connect
							</Button>
						</Row>
						<Row className='profile--container profile--avatar--container'>
							<Avatar circle className='profile--avatar' />
						</Row>
						<Row className='profile--container header--container'>
							<div className='header'>{personalInfo.name}</div>
						</Row>
						<Row className='profile--container profile--body--container'>
							<Nav className='profile--navbar' appearance='tabs' justified>
								<Nav.Item active className='active-tab' onSelect={() => setCurrentCategory('Work Experience')}>
									Work Experience
								</Nav.Item>
								<Nav.Item onSelect={() => setCurrentCategory('Education')}>Education</Nav.Item>
								<Nav.Item onSelect={() => setCurrentCategory('Skills')}>Skills</Nav.Item>
							</Nav>
							<div className='info--container'>{personalInfo.name && displayInfo()}</div>
						</Row>
					</FlexboxGrid.Item>
				)}
				<FlexboxGrid.Item colspan={4}></FlexboxGrid.Item>
			</FlexboxGrid>
		</Container>
	);
};

export default Profile;
