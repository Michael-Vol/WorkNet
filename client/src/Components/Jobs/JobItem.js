import React, { useState, useEffect } from 'react';
import { Avatar, Panel, Row, Col, Divider } from 'rsuite';
import './JobItem.scss';
import Moment from 'react-moment';

const JobItem = () => {
	return (
		<Row className='job--container'>
			<Col>
				<Row className='job--header'>
					<Col md={2}>
						<Avatar circle className='job--creator--avatar' />
					</Col>
					<Col className='job--creator--info'>
						<span> FirstName LastName added a new job post</span>
						<span className='job--creator--date'>23/4/2021 23:39</span>
					</Col>
					<Divider className='job--header--divider' />
				</Row>
			</Col>
		</Row>
	);
};

export default JobItem;
