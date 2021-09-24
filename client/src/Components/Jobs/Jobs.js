import React, { useState, useEffect } from 'react';
import './Jobs.scss';
import { FlexboxGrid, Divider, List, PanelGroup, Panel, Row, Col, Button } from 'rsuite';
import JobItem from './JobItem';
import { getJobs } from '../../Actions/jobs';
import { useDispatch, useSelector } from 'react-redux';
const Jobs = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const jobs = useSelector((state) => state.jobs.jobs);
	const fetchJobs = async () => {
		const res = await getJobs();
		dispatch(res);
	};

	useEffect(async () => {
		if (user) {
			await fetchJobs();
		}
	}, [user]);

	return (
		<FlexboxGrid className='jobs--flex--container'>
			<FlexboxGrid.Item colspan={3}></FlexboxGrid.Item>
			<FlexboxGrid.Item colspan={18} className='jobs--container'>
				<div className='jobs--header'>
					Job Posts
					<Divider className='jobs--divider' />
				</div>
				<Row className='jobs--main--container'>
					<Row className='jobs--options--header'>
						<Button className='add--post--btn'>Add Post</Button>
						<span className='jobs--counter'>24 Jobs</span>
					</Row>
					<Panel className='jobs--posts--container'>
						{jobs &&
							jobs.map((job, index) => {
								return <JobItem key={index} job={job} />;
							})}
					</Panel>
				</Row>
			</FlexboxGrid.Item>
			<FlexboxGrid.Item colspan={3}></FlexboxGrid.Item>
		</FlexboxGrid>
	);
};

export default Jobs;
