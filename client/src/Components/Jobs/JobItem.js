import React, { useState, useEffect } from 'react';
import { Avatar, Row, Col, Divider, Tag, Button } from 'rsuite';
import { useDispatch } from 'react-redux';
import './JobItem.scss';
import { getAvatar } from '../../Actions/posts';
import { checkApplicationStatus, applyJob, getApplicants } from '../../Actions/jobs';
import { useSelector } from 'react-redux';
import UserItem from './UserItem';
import Moment from 'react-moment';

const JobItem = ({ job }) => {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.auth.user);
	const updatedApplicants = useSelector((state) => state.jobs.updatedApplicants);
	const [applicants, setApplicants] = useState(null);

	const [avatar, setAvatar] = useState(null);
	const [applied, setApplied] = useState(false);
	const [showApplicants, setShowApplicants] = useState(false);
	const ownPost = job.creator._id === user._id;

	const fetchAvatar = async (userId) => {
		const res = await getAvatar(userId);
		dispatch(res);
		setAvatar(res.payload.avatar);
	};
	const fetchApplicationStatus = async (jobId) => {
		if (!ownPost) {
			const res = await checkApplicationStatus(jobId);
			dispatch(res);
			setApplied(res.payload.applied);
		}
	};
	const fetchApplicants = async (jobId) => {
		if (ownPost) {
			const res = await getApplicants(jobId);
			dispatch(res);
			setApplicants(res.payload.applicants);
		}
	};
	const submitApplication = async (jobId) => {
		const res = await applyJob(jobId);
		dispatch(res);
		await fetchApplicationStatus(jobId);
	};
	useEffect(async () => {
		await fetchAvatar(job.creator._id);
		await fetchApplicationStatus(job._id);
		await fetchApplicants(job._id);
	}, []);

	useEffect(() => {
		if (updatedApplicants) {
			setShowApplicants(false);
		}
	}, [updatedApplicants]);
	return (
		<Row className='job--container'>
			<Row className='job--header'>
				<Col md={2}>
					<Avatar circle src={`data:image/png;base64,${avatar}`} className='job--creator--avatar' />
				</Col>
				<Col className='job--creator--info'>
					<span> {job.creator.firstName.concat(' ').concat(job.creator.lastName)} added a new job post</span>
					<span className='job--creator--date'>
						<Moment format='dddd D/M/YYYY'>{job.createdAt}</Moment>
					</span>
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
				{ownPost ? (
					<Button
						className='job--own--btn'
						appearance='primary'
						onClick={() => setShowApplicants(!showApplicants)}
						disabled={!job.open}>
						Select Applicant
					</Button>
				) : (
					<Button
						className='job--apply--btn'
						disabled={applied}
						appearance='primary'
						onClick={() => submitApplication(job._id)}>
						{applied ? 'Applied' : 'Apply'}
					</Button>
				)}
				{showApplicants && (
					<Row className='applicants--container'>
						{applicants &&
							applicants.map((applicant, index) => {
								return <UserItem key={index} user={applicant} job={job} />;
							})}
					</Row>
				)}
			</Row>
		</Row>
	);
};

export default JobItem;
