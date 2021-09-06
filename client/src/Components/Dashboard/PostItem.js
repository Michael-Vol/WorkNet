import React, { useEffect, useState } from 'react';
import { Avatar, Col, Row } from 'rsuite';
import './PostItem.scss';
import Moment from 'react-moment';
import { getAvatar } from '../../Actions/posts';
import { useDispatch } from 'react-redux';
const PostItem = ({ post, index }) => {
	const dispatch = useDispatch();
	const [avatar, setAvatar] = useState([]);
	const [imageConverted, setimageConverted] = useState(false);
	useEffect(async () => {
		const res = await getAvatar(post.creator._id);
		dispatch(res);
		setAvatar(res.payload);
		console.log(post);
		if (post.image) {
			post.image.data = Buffer.from(post.image.data).toString('base64');
			setimageConverted(true);
		}
	}, []);
	return (
		<Col md={18} className='container post--container' key={index}>
			<Row className='post--header'>
				<Col md={2} className='post--avatar'>
					<Avatar circle src={`data:image/png;base64,${avatar}`} className='image' />
				</Col>
				<Col md={4} className='post--user--info'>
					<div>
						{post.creator.firstName} {post.creator.lastName}
					</div>
				</Col>
				<Col md={4} className='post--date'>
					<div>
						<Moment format='ddd D/MM  hh:mm a'>{post.createdAt}</Moment>
					</div>
				</Col>
			</Row>
			<Row className='post--title'>
				<h4>{post.title}</h4>
			</Row>
			<Row className='post--body'>{post.body}</Row>
			<Row className='post--image--container'>
				{imageConverted && <img className='post--image' src={`data:image/png;base64,${post.image.data}`} />}{' '}
			</Row>
		</Col>
	);
};

export default PostItem;