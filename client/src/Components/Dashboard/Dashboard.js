import React, { useState } from 'react';
import {
	Container,
	Avatar,
	ButtonToolbar,
	Button,
	Form,
	FormGroup,
	FormControl,
	ControlLabel,
	Divider,
	Grid,
	Row,
	Col,
	FlexboxGrid,
	Modal,
} from 'rsuite';
import './Dashboard.scss';
import SideNav from './SideNav.js';
const Dashboard = () => {
	const [newPost, setNewPost] = useState(false);
	return (
		<Container className='dashboard--container'>
			<FlexboxGrid justify='start' className='dashboard--flex--container'>
				<FlexboxGrid.Item colspan={3}>
					<SideNav />
				</FlexboxGrid.Item>
				<FlexboxGrid.Item colspan={16} className='container posts--container'>
					<Row className='container create--post--container'>
						<Row className='new--post--header'>
							<Col md={24}>
								<Button className='new--post--btn' onClick={() => setNewPost(!newPost)}>
									New Post
								</Button>
							</Col>
						</Row>
						{newPost && (
							<Modal show={newPost} onHide={() => setNewPost(false)}>
								<Modal.Header>
									<h3>New Post</h3>
								</Modal.Header>
								<Modal.Body>
									<Form fluid className='new--post--form'>
										<FormGroup key='form__title' className='add--post--title'>
											<ControlLabel className='form__label'>
												<span>Title</span>
											</ControlLabel>
											<FormControl name='title' />
										</FormGroup>
										<FormGroup key='form__body'>
											<ControlLabel className='form__label'>
												<span>Your Thoughts</span>
											</ControlLabel>
											<FormControl className='add--post--body' componentClass='textarea' name='password' />
										</FormGroup>
										<FormGroup>
											<ButtonToolbar className='add--post--toolbar'>
												<Button className='submit--post--btn' appearance='primary'>
													Submit
												</Button>
												<Button
													className='cancel--post--btn'
													appearance='default'
													onClick={() => setNewPost(false)}>
													Cancel
												</Button>
											</ButtonToolbar>
										</FormGroup>
									</Form>
								</Modal.Body>
							</Modal>
						)}
					</Row>
					<Row className='posts--header'>
						<span>Posts</span>
						<Divider className='posts--divider' />
					</Row>
					<Grid className='test'>
						<Row>
							<Col md={18} className='container post--container'>
								<Row className='post--header'>
									<Col md={2} className='post--avatar'>
										<Avatar circle />
									</Col>
									<Col md={4} className='post--user--info'>
										<div>User Info</div>
									</Col>
								</Row>
								<Row className='post--title'>
									<h4>Title</h4>
								</Row>
								<Row className='post--body'>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, totam cumque consequatur
									inventore ad ex impedit nihil quasi, eaque illum dolores eveniet veniam quod provident! Beatae
									tenetur corrupti, vero delectus illum error cupiditate laboriosam ab impedit odio perferendis
									nam iste neque reprehenderit quod repudiandae animi dolor sequi fugit deserunt! Earum! Lorem
									ipsum dolor sit amet consectetur adipisicing elit. Rem, totam cumque consequatur inventore ad
									ex impedit nihil quasi, eaque illum dolores eveniet veniam quod provident! Beatae tenetur
									corrupti, vero delectus illum error cupiditate laboriosam ab impedit odio perferendis nam iste
									neque reprehenderit quod repudiandae animi dolor sequi fugit deserunt! Earum!
								</Row>
							</Col>
							<Col md={18} className='container post--container'>
								<Row className='post--header'>
									<Col md={2} className='post--avatar'>
										<Avatar circle />
									</Col>
									<Col md={4} className='post--user--info'>
										<div>User Info</div>
									</Col>
								</Row>
								<Row className='post--title'>
									<h4>Title</h4>
								</Row>
								<Row className='post--body'>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, totam cumque consequatur
									inventore ad ex impedit nihil quasi, eaque illum dolores eveniet veniam quod provident! Beatae
									tenetur corrupti, vero delectus illum error cupiditate laboriosam ab impedit odio perferendis
									nam iste neque reprehenderit quod repudiandae animi dolor sequi fugit deserunt! Earum! Lorem
									ipsum dolor sit amet consectetur adipisicing elit. Rem, totam cumque consequatur inventore ad
									ex impedit nihil quasi, eaque illum dolores eveniet veniam quod provident! Beatae tenetur
									corrupti, vero delectus illum error cupiditate laboriosam ab impedit odio perferendis nam iste
									neque reprehenderit quod repudiandae animi dolor sequi fugit deserunt! Earum!
								</Row>
							</Col>
							<Col md={18} className='container post--container'>
								<Row className='post--header'>
									<Col md={2} className='post--avatar'>
										<Avatar circle />
									</Col>
									<Col md={4} className='post--user--info'>
										<div>User Info</div>
									</Col>
								</Row>
								<Row className='post--title'>
									<h4>Title</h4>
								</Row>
								<Row className='post--body'>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, totam cumque consequatur
									inventore ad ex impedit nihil quasi, eaque illum dolores eveniet veniam quod provident! Beatae
									tenetur corrupti, vero delectus illum error cupiditate laboriosam ab impedit odio perferendis
									nam iste neque reprehenderit quod repudiandae animi dolor sequi fugit deserunt! Earum! Lorem
									ipsum dolor sit amet consectetur adipisicing elit. Rem, totam cumque consequatur inventore ad
									ex impedit nihil quasi, eaque illum dolores eveniet veniam quod provident! Beatae tenetur
									corrupti, vero delectus illum error cupiditate laboriosam ab impedit odio perferendis nam iste
									neque reprehenderit quod repudiandae animi dolor sequi fugit deserunt! Earum!
								</Row>
							</Col>
						</Row>
					</Grid>
				</FlexboxGrid.Item>
				<FlexboxGrid.Item colspan={4} className='users--list--container'>
					<Row className='users--list--user'>
						<Col>
							<Avatar circle />
						</Col>
						<Col>
							<div>User Info</div>
						</Col>
					</Row>
					<Row className='users--list--user'>
						<Col>
							<Avatar circle />
						</Col>
						<Col>
							<div>User Info</div>
						</Col>
					</Row>
					<Row className='users--list--user'>
						<Col>
							<Avatar circle />
						</Col>
						<Col>
							<div>User Info</div>
						</Col>
					</Row>
					<Row className='users--list--user'>
						<Col>
							<Avatar circle />
						</Col>
						<Col>
							<div>User Info</div>
						</Col>
					</Row>
					<Row className='users--list--user'>
						<Col>
							<Avatar circle />
						</Col>
						<Col>
							<div>User Info</div>
						</Col>
					</Row>
				</FlexboxGrid.Item>
			</FlexboxGrid>
		</Container>
	);
};

export default Dashboard;
