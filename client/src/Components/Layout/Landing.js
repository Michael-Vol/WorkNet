import React from 'react';
import { Button, ButtonToolbar } from 'rsuite';
import { Grid, Row, Col, Container, Content } from 'rsuite';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Landing.scss';
const Landing = (props) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

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
					{/* <Col xs={3}> */}
					<ButtonToolbar>
						<Button size='lg' className='landing__btn'>
							{/* <span className='btn'> */}
							<Link to='/login'>Login</Link>
							{/* </span> */}
						</Button>
						{/* </Col> */}
						{/* <Col xs={3}> */}
						<Button size='lg' className='landing__btn'>
							{/* <span className='btn'> */}
							<Link to='/register'>Register</Link>
							{/* </span> */}
						</Button>
					</ButtonToolbar>
					{/* </Col> */}
				</Row>
			</Grid>
		</Content>
	);
};

Landing.propTypes = {};

export default Landing;
