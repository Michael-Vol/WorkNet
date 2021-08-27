import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar } from 'rsuite';
import { Grid, Row, Col } from 'rsuite';
import Typical from 'react-typical';
import './Landing.scss';
const Landing = (props) => {
	return (
		<div className='landing__background'>
			<section className='landing'>
				<section className='landing__info'>
					<Grid>
						<Row className='show-grid'>
							<h1 className='landing__title'>WorkNet</h1>
						</Row>
						<Row className='show-grid'>
							<h3 className='landing__subtitle'>
								The Social Network for Professionals
								{/* <Typical
									steps={[
										1000,
										'Developers',
										1000,
										'Engineers',
										1000,
										'Business Managers',
										1000,
										'Architects',
										1000,
										'Recruiters',
										1000,
										'Graphic Designers',
									]}
									loop={1}
								/> */}
							</h3>
						</Row>
						<Row className='show-grid'>
							<Col xs={4}>
								<Button className='landing__btn'>
									<span className='btn'>Login</span>
								</Button>
							</Col>
							<Col xs={4}>
								<Button className='landing__btn'>
									<span className='btn'>Register</span>
								</Button>
							</Col>
						</Row>
					</Grid>
				</section>
			</section>
		</div>
	);
};

Landing.propTypes = {};

export default Landing;
