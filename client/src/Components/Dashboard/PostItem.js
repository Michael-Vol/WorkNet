import React from 'react';
import { Avatar, Col, Row } from 'rsuite';
import './PostItem.scss';
import Moment from 'react-moment';
const PostItem = ({ post, index }) => {
	return (
		<Col md={18} className='container post--container' key={index}>
			<Row className='post--header'>
				<Col md={2} className='post--avatar'>
					<Avatar circle />
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
		</Col>
	);
};

export default PostItem;
