import React, { useRef, useState, useEffect } from 'react';
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
	Uploader,
	Icon,
	Schema,
} from 'rsuite';
import './Dashboard.scss';
import { getPosts } from '../../Actions/posts';
import SideNav from './SideNav.js';
import { useDispatch, useSelector } from 'react-redux';
const Dashboard = () => {
	const formRef = useRef();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const [newPost, setNewPost] = useState(false);
	const [posts, setPosts] = useState({ posts: [] });
	const [formData, setFormData] = useState({
		title: '',
		body: '',
	});
	const fetchPosts = async () => {
		const res = await getPosts();
		const postsState = dispatch(res);
		setPosts(postsState.payload);
		console.log(posts);
	};
	useEffect(async () => {
		if (user) {
			await fetchPosts();
		}
	}, [getPosts, user]);

	const { StringType } = Schema.Types;

	const model = Schema.Model({
		title: StringType().isRequired('This field is required'),
		body: StringType().isRequired('This field is required'),
	});

	const handleSubmit = async () => {
		if (formRef.current.check()) {
			console.log(formData);
		}
	};

	return (
		<Container className='dashboard--container'>
			<FlexboxGrid justify='start' className='dashboard--flex--container'>
				<FlexboxGrid.Item colspan={3}>
					<SideNav />
				</FlexboxGrid.Item>
				<FlexboxGrid.Item colspan={16} className='container posts--container'>
					<Row className='container create--post--container'>
						<Row className='new--post--header'>
							<Col md={12}>
								<Button className='new--post--btn' onClick={() => setNewPost(!newPost)}>
									New Post
								</Button>
							</Col>
							<Col md={12}>
								<Button className='refresh--posts--btn'>Refresh</Button>
							</Col>
						</Row>
						{newPost && (
							<Modal show={newPost} onHide={() => setNewPost(false)}>
								<Modal.Header>
									<h3>New Post</h3>
								</Modal.Header>
								<Modal.Body>
									<Form
										fluid
										className='new--post--form'
										ref={formRef}
										model={model}
										onChange={(value) => setFormData(value)}>
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
											<FormControl className='add--post--body' componentClass='textarea' name='body' />
										</FormGroup>
										<FormGroup className='form__image'>
											<Uploader listType='picture'>
												<button>
													<Icon icon='camera-retro' size='lg' />
												</button>
											</Uploader>
										</FormGroup>
										<FormGroup>
											<ButtonToolbar className='add--post--toolbar'>
												<Button
													className='submit--post--btn'
													appearance='primary'
													onClick={() => {
														handleSubmit();
													}}>
													Submit
												</Button>
												<Button
													className='cancel--post--btn'
													appearance='default'
													onClick={() => {
														setNewPost(false);
													}}>
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
								<Row className='post--body'>{posts[0] && posts[0].body}</Row>
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
