import React, { useEffect, useState } from 'react';
import { Avatar, Col, Row, Button, Badge } from 'rsuite';
import './PostItem.scss';
import Moment from 'react-moment';
import { getAvatar, likePost, getPostLiked, getLikesCount } from '../../Actions/posts';
import { useDispatch } from 'react-redux';
const PostItem = ({ post, index }) => {
	const dispatch = useDispatch();
	const [avatar, setAvatar] = useState([]);
	const [imageConverted, setimageConverted] = useState(false);
	const [liked, setliked] = useState(false);
	const [numLikes, setNumLikes] = useState(0);
	useEffect(async () => {
		const res = await getAvatar(post.creator._id);
		await postLiked();
		await getNumLikes();

		dispatch(res);
		setAvatar(res.payload);
		if (post.image && post.image.data) {
			post.image.data = Buffer.from(post.image.data).toString('base64');
			setimageConverted(true);
		}
	}, []);

	const postLiked = async () => {
		const postLikedRes = await getPostLiked(post._id);
		dispatch(postLikedRes);
		setliked(postLikedRes.payload.liked);
	};

	const getNumLikes = async () => {
		const numLikesRes = await getLikesCount(post._id);
		dispatch(numLikesRes);
		setNumLikes(numLikesRes.payload.likes);
	};

	const postLike = async () => {
		const res = await likePost(post._id);
		dispatch(res);
		setliked(res.payload.liked);
		await getNumLikes();
	};

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
				{imageConverted && post.image && <img className='post--image' src={`data:image/png;base64,${post.image.data}`} />}{' '}
			</Row>
			<Row className='post--actions'>
				<Col md={4}>
					<Button appearance='ghost' className='like--btn' onClick={() => postLike()}>
						<i className='fas fa-thumbs-up like--icon'></i>
						{liked ? 'Unlike' : 'Like'}
						<Badge className='likes--count' content={numLikes}></Badge>
					</Button>
				</Col>
				<Col>
					<div className='comment--btn'>
						<i className='fas fa-comment comment--icon'></i>
						20 Comments
					</div>
				</Col>
			</Row>
		</Col>
	);
};

export default PostItem;
