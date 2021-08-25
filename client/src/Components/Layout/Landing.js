import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'rsuite';
import { Grid, Row, Col } from 'rsuite';
import './Landing.scss';

const Landing = (props) => {
	return (
		<div>
			{/* <div
				className='landing__background'
				style={{
					backgroundImage: `url(/images/landing-background.jpg)`,
				}}> */}
			<section className='landing'>
				<Grid fluid>
					<Row className='show-grid'>
						<h1 className='landing__title'>WorkNet</h1>
					</Row>
					<Row className='show-grid'>
						<h3 className='landing__subtitle'>The Social Network for Professionals</h3>
					</Row>
					<Row className='show-grid landing__btn'>
						<Col xs={4}>
							<Button>Login</Button>
						</Col>
						<Col xs={4}>
							<Button>Register</Button>
						</Col>
					</Row>
				</Grid>
			</section>
			{/* </div> */}
		</div>
	);
};

Landing.propTypes = {};

export default Landing;
