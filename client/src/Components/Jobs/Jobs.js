import React, { useState, useEffect } from 'react';
import './Jobs.scss';
import { FlexboxGrid, Divider, List, PanelGroup, Panel, Row, Col, Button } from 'rsuite';
import JobItem from './JobItem';
const Jobs = () => {
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
						<JobItem />
					</Panel>
				</Row>
			</FlexboxGrid.Item>
			<FlexboxGrid.Item colspan={3}></FlexboxGrid.Item>
		</FlexboxGrid>
	);
};

export default Jobs;
