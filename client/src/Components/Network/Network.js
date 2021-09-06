import React from 'react';
import './Network.scss';

import { Panel, Row, Col, Container, InputGroup, Input, Icon } from 'rsuite';
const Network = () => {
	return (
		<Container className='network--container'>
			<Row className='search--container'>
				<Col md={22} className='search'>
					<InputGroup>
						<Input />
						<InputGroup.Button>
							<Icon icon='search' />
						</InputGroup.Button>
					</InputGroup>
				</Col>
			</Row>
			<Row className='users--container'>
				<Col md={6} className='user--panel--container'>
					<Panel header='header'>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae cum praesentium enim alias optio illo,
						officiis quas! Molestias nihil quae sapiente aperiam quasi, totam blanditiis placeat rem in pariatur quam
						repellendus, corrupti esse enim qui. Suscipit in molestias facere? Pariatur eius illo in nam a voluptas
						laudantium cum dolores enim!
					</Panel>
				</Col>
				<Col md={6} className='user--panel--container'>
					<Panel header='header'>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae cum praesentium enim alias optio illo,
						officiis quas! Molestias nihil quae sapiente aperiam quasi, totam blanditiis placeat rem in pariatur quam
						repellendus, corrupti esse enim qui. Suscipit in molestias facere? Pariatur eius illo in nam a voluptas
						laudantium cum dolores enim!
					</Panel>
				</Col>
				<Col md={6} className='user--panel--container'>
					<Panel header='header'>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae cum praesentium enim alias optio illo,
						officiis quas! Molestias nihil quae sapiente aperiam quasi, totam blanditiis placeat rem in pariatur quam
						repellendus, corrupti esse enim qui. Suscipit in molestias facere? Pariatur eius illo in nam a voluptas
						laudantium cum dolores enim!
					</Panel>
				</Col>
				<Col md={6} className='user--panel--container'>
					<Panel header='header'>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae cum praesentium enim alias optio illo,
						officiis quas! Molestias nihil quae sapiente aperiam quasi, totam blanditiis placeat rem in pariatur quam
						repellendus, corrupti esse enim qui. Suscipit in molestias facere? Pariatur eius illo in nam a voluptas
						laudantium cum dolores enim!
					</Panel>
				</Col>
				<Col md={6} className='user--panel--container'>
					<Panel header='header'>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae cum praesentium enim alias optio illo,
						officiis quas! Molestias nihil quae sapiente aperiam quasi, totam blanditiis placeat rem in pariatur quam
						repellendus, corrupti esse enim qui. Suscipit in molestias facere? Pariatur eius illo in nam a voluptas
						laudantium cum dolores enim!
					</Panel>
				</Col>
			</Row>
		</Container>
	);
};

export default Network;
