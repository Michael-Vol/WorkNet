import React from 'react';
import { Button, ButtonToolbar } from 'rsuite';
import { Grid, Row, Col, Container, Content } from 'rsuite';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Landing.scss';
const Landing = (props) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const history = useHistory();
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
					<ButtonToolbar>
						<Button size='lg' className='landing__btn' onClick={() => history.push('/login')}>
							{/* <Link to='/login'>Login</Link> */}
							<span className='auth--btn'> Login</span>
						</Button>
						<Button size='lg' className='landing__btn' onClick={() => history.push('/register')}>
							<span className='auth--btn'> Register</span>
						</Button>
					</ButtonToolbar>
				</Row>
			</Grid>
		</Content>
	);
};

Landing.propTypes = {};

export default Landing;
