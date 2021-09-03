import React, { useState } from 'react';
import { Container, Avatar, Button, Form, FormGroup, Divider, Grid, Row, Col, FlexboxGrid } from 'rsuite';
import './Dashboard.scss';
import SideNav from './SideNav.js';
const Dashboard = () => {
	return (
		<Container className='dashboard--container'>
			<FlexboxGrid justify='start' className='dashboard--flex--container'>
				<FlexboxGrid.Item>
					<SideNav />
				</FlexboxGrid.Item>
				<FlexboxGrid.Item colspan={14} className='container posts--container'>
					<Row className='container create--post--container'>
						<Row className='add--post--header'></Row>

						<Col>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad neque rerum cumque quibusdam mollitia! Ex,
							nostrum quisquam est odit suscipit sunt! Fugit fuga iusto ratione minima assumenda explicabo iste
							nobis hic harum amet? Laboriosam sunt pariatur tempora facere, quae dolorem? Dolorum deserunt unde
							rerum dolor ratione voluptates vitae, rem fugit maxime, id pariatur, veritatis voluptas quibusdam
							accusantium asperiores magnam autem commodi. Suscipit sint aut facilis et voluptates aperiam magnam
							dolore natus fugit quaerat harum tempora officia incidunt amet placeat error rem, eligendi, quam
							dolores. Amet molestias laborum asperiores provident sint commodi odit, reiciendis, expedita culpa
							accusantium ipsa veritatis assumenda neque.
						</Col>
					</Row>
					<Row className='posts--header'>
						<span>Posts</span>
						<Divider className='posts--divider' />
					</Row>
					<Grid className='test'>
						<Row>
							<Col md={18} className='container post--container'>
								<Row className='post--header'>
									<Col md={2} className='post--avatar'>
										<Avatar circle />
									</Col>
									<Col md={4} className='post--user--info'>
										<div>User Info</div>
									</Col>
								</Row>
								<Row className='post--title'>
									<h4>Title</h4>
								</Row>
								<Row className='post--body'>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, totam cumque consequatur
									inventore ad ex impedit nihil quasi, eaque illum dolores eveniet veniam quod provident! Beatae
									tenetur corrupti, vero delectus illum error cupiditate laboriosam ab impedit odio perferendis
									nam iste neque reprehenderit quod repudiandae animi dolor sequi fugit deserunt! Earum! Lorem
									ipsum dolor sit amet consectetur adipisicing elit. Rem, totam cumque consequatur inventore ad
									ex impedit nihil quasi, eaque illum dolores eveniet veniam quod provident! Beatae tenetur
									corrupti, vero delectus illum error cupiditate laboriosam ab impedit odio perferendis nam iste
									neque reprehenderit quod repudiandae animi dolor sequi fugit deserunt! Earum!
								</Row>
							</Col>
							<Col md={18} className='container post--container'>
								<Row className='post--header'>
									<Col md={2} className='post--avatar'>
										<Avatar circle />
									</Col>
									<Col md={4} className='post--user--info'>
										<div>User Info</div>
									</Col>
								</Row>
								<Row className='post--title'>
									<h4>Title</h4>
								</Row>
								<Row className='post--body'>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, totam cumque consequatur
									inventore ad ex impedit nihil quasi, eaque illum dolores eveniet veniam quod provident! Beatae
									tenetur corrupti, vero delectus illum error cupiditate laboriosam ab impedit odio perferendis
									nam iste neque reprehenderit quod repudiandae animi dolor sequi fugit deserunt! Earum! Lorem
									ipsum dolor sit amet consectetur adipisicing elit. Rem, totam cumque consequatur inventore ad
									ex impedit nihil quasi, eaque illum dolores eveniet veniam quod provident! Beatae tenetur
									corrupti, vero delectus illum error cupiditate laboriosam ab impedit odio perferendis nam iste
									neque reprehenderit quod repudiandae animi dolor sequi fugit deserunt! Earum!
								</Row>
							</Col>
							<Col md={18} className='container post--container'>
								<Row className='post--header'>
									<Col md={2} className='post--avatar'>
										<Avatar circle />
									</Col>
									<Col md={4} className='post--user--info'>
										<div>User Info</div>
									</Col>
								</Row>
								<Row className='post--title'>
									<h4>Title</h4>
								</Row>
								<Row className='post--body'>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, totam cumque consequatur
									inventore ad ex impedit nihil quasi, eaque illum dolores eveniet veniam quod provident! Beatae
									tenetur corrupti, vero delectus illum error cupiditate laboriosam ab impedit odio perferendis
									nam iste neque reprehenderit quod repudiandae animi dolor sequi fugit deserunt! Earum! Lorem
									ipsum dolor sit amet consectetur adipisicing elit. Rem, totam cumque consequatur inventore ad
									ex impedit nihil quasi, eaque illum dolores eveniet veniam quod provident! Beatae tenetur
									corrupti, vero delectus illum error cupiditate laboriosam ab impedit odio perferendis nam iste
									neque reprehenderit quod repudiandae animi dolor sequi fugit deserunt! Earum!
								</Row>
							</Col>
						</Row>
					</Grid>
				</FlexboxGrid.Item>
			</FlexboxGrid>
		</Container>
	);
};

export default Dashboard;
