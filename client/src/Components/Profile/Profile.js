import React from 'react';
import './Profile.scss';

import { Container, FlexboxGrid, Avatar, Row, Nav, Button } from 'rsuite';
const Profile = () => {
	return (
		<Container className='profile--container'>
			<FlexboxGrid justify='start' className='profile--flex--container'>
				<FlexboxGrid.Item colspan={4}></FlexboxGrid.Item>
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
						<div className='header'>FirstName LastName</div>
					</Row>
					<Row className='profile--container profile--body--container'>
						<Nav className='profile--navbar' appearance='tabs' justified>
							<Nav.Item active className='active-tab'>
								User Info
							</Nav.Item>
							<Nav.Item>Work Experience</Nav.Item>
							<Nav.Item>Education</Nav.Item>
							<Nav.Item>Skills</Nav.Item>
						</Nav>
						<div className='info--container'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio natus provident, nostrum
							accusantium nihil eius dolor modi voluptatum adipisci numquam saepe vel assumenda deserunt repellendus
							et, atque veritatis qui molestias odio doloribus est! Repudiandae laborum aliquid sed. Quia
							exercitationem blanditiis saepe non eaque, veritatis fugiat! Optio in dolorum iure sapiente impedit
							quasi voluptatum. Perspiciatis cupiditate voluptate, reiciendis ea animi, expedita officiis veritatis
							optio ut quos nisi? Iusto, inventore doloribus ut harum porro ex, mollitia beatae, rem omnis dicta
							dignissimos a?{' '}
						</div>
					</Row>
				</FlexboxGrid.Item>
				<FlexboxGrid.Item colspan={4}></FlexboxGrid.Item>
			</FlexboxGrid>
		</Container>
	);
};

export default Profile;
