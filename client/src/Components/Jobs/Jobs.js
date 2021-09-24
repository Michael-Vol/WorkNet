import React, { useState, useEffect } from 'react';
import './Jobs.scss';
import { FlexboxGrid, Divider, List, PanelGroup, Panel } from 'rsuite';
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
				<div className='jobs--main--container'>
					<div className='jobs--count--header'>24 Job Posts</div>
					<Panel className='jobs--posts--container'>
						<JobItem />
					</Panel>
				</div>
			</FlexboxGrid.Item>
			<FlexboxGrid.Item colspan={3}></FlexboxGrid.Item>
		</FlexboxGrid>
	);
};

export default Jobs;
