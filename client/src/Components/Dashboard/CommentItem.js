import React, { useEffect, useState } from 'react';
import './CommentItem.scss';
import './PostItem.scss';
import Moment from 'react-moment';
import { Container, List, Row, Col, Avatar } from 'rsuite';
import { getAvatar } from '../../Actions/posts';
import { useDispatch } from 'react-redux';
const CommentItem = ({ comment }) => {
	const [avatar, setAvatar] = useState(null);
	const dispatch = useDispatch();

	useEffect(async () => {
		const res = await getAvatar(comment.creator._id);
		dispatch(res);
		setAvatar(res.payload);
	}, []);

	return (
		<Container>
			<List.Item className='comment--item'>
				<Row className='post--header'>
					<Col md={2} className='post--avatar'>
						<Avatar circle src={`data:image/png;base64,${avatar}`} className='image' />
					</Col>
					<Col md={4} className='post--user--info'>
						<div>
							{comment && comment.creator.firstName} {comment && comment.creator.lastName}
						</div>
					</Col>
				</Row>
				<Row className='comment--body'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium alias, nesciunt odio quos obcaecati
					quisquam facilis quidem sequi. Repellat quibusdam, ipsa nihil voluptatum veritatis aut numquam dolores sequi
					architecto assumenda aperiam suscipit quos aspernatur nostrum quia alias id nam. Dignissimos illum ipsam
					maxime impedit laudantium eveniet, adipisci deserunt blanditiis molestias.
				</Row>
				<Row className='comment--date'>
					<Moment format='ddd D/MM  hh:mm a'>{comment && comment.createdAt}</Moment>
				</Row>
			</List.Item>
		</Container>
	);
};

export default CommentItem;
