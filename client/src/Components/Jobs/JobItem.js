import React, { useState, useEffect } from 'react';
import { Avatar, Panel, Row, Col, Divider, Tag, ButtonGroup, Button } from 'rsuite';
import { useDispatch } from 'react-redux';
import './JobItem.scss';
import { getAvatar } from '../../Actions/posts';
import Moment from 'react-moment';

const JobItem = ({ job }) => {
	const dispatch = useDispatch();
	const [avatar, setAvatar] = useState(null);

	const fetchAvatar = async (userId) => {
		const res = await getAvatar(userId);
		dispatch(res);
		setAvatar(res.payload);
	};
	useEffect(async () => {
		await fetchAvatar(job.creator._id);
	}, []);

	return (
		<Row className='job--container'>
			<Row className='job--header'>
				<Col md={2}>
					<Avatar circle src={`data:image/png;base64,${avatar}`} className='job--creator--avatar' />
				</Col>
				<Col className='job--creator--info'>
					<span> {job.creator.firstName.concat(' ').concat(job.creator.lastName)} added a new job post</span>
					<span className='job--creator--date'>23/4/2021 23:39</span>
				</Col>
				<Divider className='job--header--divider' />
			</Row>
			<Row className='job--info'>
				<Row className='job--info--description'>
					<Col md={18}>Title: {job.title}</Col>
				</Row>
				<Row className='job--info--description'>
					<Col md={18}>Number of Applicants: {job.applicants.length}</Col>
				</Row>
				<Row className='job--info--description'>
					<Col md={18}>
						Status : {job.open ? <Tag className='open--tag'>Open</Tag> : <Tag className='closed--tag'>Closed</Tag>}
					</Col>
				</Row>
				<Row className='job--info--description'>
					<Col md={18}>
						Keywords:
						{job.keywords.map((keyword, index) => (
							<Tag className='keyword--tag' key={index}>
								{keyword}
							</Tag>
						))}
					</Col>
				</Row>
				<Row className='job--info--description job--info--body--container'>
					<Col>
						<span>Description:</span>
						<div className='job--info--body'>{job.body}</div>
					</Col>
				</Row>
			</Row>
			<Row className='job--apply'>
				<Button className='job--apply--btn' appearance='primary'>
					Apply
				</Button>
			</Row>
		</Row>
	);
};

export default JobItem;
