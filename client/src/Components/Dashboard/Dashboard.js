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
	Placeholder,
} from 'rsuite';
import './Dashboard.scss';
import { getPosts } from '../../Actions/posts';
import SideNav from './SideNav.js';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, getAvatar } from '../../Actions/posts';
import PostItem from './PostItem';
import { getUsers } from '../../Actions/users';
import UserItem from './UserItem';
const Dashboard = () => {
	const formRef = useRef();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const users = useSelector((state) => state.users.users);
	let posts = useSelector((state) => state.posts.posts);

	const [newPost, setNewPost] = useState(false);
	const [formData, setFormData] = useState({
		title: '',
		body: '',
	});
	const [formImage, setFormImage] = useState({});

	const fetchPosts = async () => {
		console.log('fetching posts');
		const res = await getPosts();
		dispatch(res);
	};
	const fetchUsers = async () => {
		console.log('fetching users');
		const res = await getUsers();
		dispatch(res);
		console.log(res);
	};

	useEffect(async () => {
		if (user) {
			await fetchPosts();
			await fetchUsers();
		}
	}, [user]);
	const { StringType } = Schema.Types;

	const model = Schema.Model({
		title: StringType().isRequired('This field is required'),
		body: StringType().isRequired('This field is required'),
	});

	const handleFormSubmit = async () => {
		if (formRef.current.check()) {
			setNewPost(false);
			console.log(formData);
			const res = await addPost(formData, formImage);
			console.log(res);
			dispatch(res);
			await fetchPosts();
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
								<Button className='refresh--posts--btn' onClick={async () => await fetchPosts()}>
									Refresh
								</Button>
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
											<Uploader
												listType='picture'
												multiple={false}
												autoUpload={false}
												name='formImage'
												onChange={(fileList) => {
													console.log(fileList[0]);
													setFormImage(fileList[0]);
												}}>
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
														handleFormSubmit();
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
							{!posts ? (
								<div>
									<Col md={18} className='container post--container'>
										<Placeholder.Paragraph active />
									</Col>
									<Col md={18} className='container post--container'>
										<Placeholder.Paragraph active />
									</Col>
									<Col md={18} className='container post--container'>
										<Placeholder.Paragraph active />
									</Col>
								</div>
							) : (
								posts.map((post, index) => <PostItem key={index} post={post} />)
							)}
						</Row>
					</Grid>
				</FlexboxGrid.Item>
				<FlexboxGrid.Item colspan={4} className='users--list--container'>
					{users && users.map((user, index) => <UserItem user={user} key={index} />)}
				</FlexboxGrid.Item>
			</FlexboxGrid>
		</Container>
	);
};

export default Dashboard;
