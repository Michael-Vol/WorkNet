import React, { useState, useEffect } from 'react';
import { Avatar, Panel, Row, Col, Divider, Tag, ButtonGroup, Button } from 'rsuite';
import './JobItem.scss';
import Moment from 'react-moment';

const JobItem = () => {
	return (
		<Row className='job--container'>
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
			<Row className='job--info'>
				<Row className='job--info--description'>
					<Col md={18}>Title: Software Engineer</Col>
				</Row>
				<Row className='job--info--description'>
					<Col md={18}>Number of Applicants: 23</Col>
				</Row>
				<Row className='job--info--description'>
					<Col md={18}>
						Status : <Tag className='open--tag'>Open</Tag> <Tag className='closed--tag'>Closed</Tag>
					</Col>
				</Row>
				<Row className='job--info--description'>
					<Col md={18}>
						Keywords:
						<Tag className='keyword--tag'>Software</Tag>
						<Tag className='keyword--tag'>Engineer</Tag>
						<Tag className='keyword--tag'>Cloud</Tag>
						<Tag className='keyword--tag'>AWS</Tag>
						<Tag className='keyword--tag'>JavaScript</Tag>
					</Col>
				</Row>
				<Row className='job--info--description job--info--body--container'>
					<Col>
						<span>Description:</span>
						<div className='job--info--body'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique accusantium, et temporibus nesciunt
							unde ut cumque aspernatur minus tenetur perferendis necessitatibus perspiciatis laborum in vero at,
							sit ullam nisi laboriosam obcaecati sint dolores error soluta! Rem amet consequatur qui. Autem
							distinctio consectetur accusantium cupiditate ut recusandae velit consequuntur. Ex hic, id repellat
							ipsam vitae inventore eum fugiat adipisci excepturi in similique, rerum ullam praesentium! Quos
							molestiae quibusdam nobis quasi commodi, exercitationem porro accusamus repellendus recusandae animi
							aliquam non laudantium hic.
						</div>
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
