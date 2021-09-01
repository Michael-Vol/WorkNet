import React from 'react';
import { Button } from 'rsuite';
import { Grid, Row, Col, Container, Content } from 'rsuite';
import { Link } from 'react-router-dom';

import './Landing.scss';
const Landing = (props) => {
	return (
		<Content className='landing--background'>
			<Grid className='landing--grid'>
				<Row className='show-grid'>
					<h1 className='landing__title'>WorkNet</h1>
				</Row>
				<Row className='show-grid'>
					<h3 className='landing__subtitle'>The Social Network for Professionals</h3>
				</Row>
				<Row className='show-grid'>
					<Col xs={4}>
						<Button className='landing__btn'>
							<span className='btn'>
								<Link to='/login'>Login</Link>
							</span>
						</Button>
					</Col>
					<Col xs={4}>
						<Button className='landing__btn'>
							<span className='btn'>
								<Link to='/register'>Register</Link>
							</span>
						</Button>
					</Col>
				</Row>
			</Grid>
		</Content>
	);
};

Landing.propTypes = {};

export default Landing;
