import React, { Fragment } from 'react';
import { Navbar, Nav, FlexboxGrid } from 'rsuite';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './NavBar.scss';
const NavBar = ({ onSelect, activeKey, ...props }) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const guestLinks = (
		<div>
			<Nav.Item href='/login' className='link'>
				Login
			</Nav.Item>
			<Nav.Item href='/register' className='link'>
				Register
			</Nav.Item>
		</div>
	);
	const authLinks = (
		<div>
			<Nav.Item href='/dashboard' className='link'>
				Dashboard
			</Nav.Item>
			<Nav.Item href='/network' className='link'>
				Network
			</Nav.Item>
			<Nav.Item href='/jobs' className='link'>
				Jobs
			</Nav.Item>
			<Nav.Item href='/chats' className='link'>
				Chats
			</Nav.Item>
			<Nav.Item href='/notifications' className='link'>
				Notifications
			</Nav.Item>
			<Nav.Item href='/personal-info' className='link'>
				Personal Info
			</Nav.Item>
			<Nav.Item href='/settings' className='link'>
				Settings
			</Nav.Item>
		</div>
	);
	return (
		<div className='navbar__container'>
			<Navbar {...props} appearance='inverse'>
				<Navbar.Header>
					<Link to='/' className='navbar-brand logo link'>
						WorkNet
					</Link>
				</Navbar.Header>
				<Navbar.Body>
					<FlexboxGrid justify='end'>
						<Nav onSelect={onSelect} activeKey={activeKey}>
							<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
						</Nav>
					</FlexboxGrid>
				</Navbar.Body>
			</Navbar>
		</div>
	);
};

NavBar.propTypes = {};

export default NavBar;
