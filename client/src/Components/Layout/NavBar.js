import React, { Fragment, useState } from 'react';
import { Navbar, Nav, FlexboxGrid } from 'rsuite';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Notifications from '../Notifications/Notifications';
import './NavBar.scss';
const NavBar = ({ onSelect, activeKey, ...props }) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const [selectNotifications, setSelectNotifications] = useState(false);

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
			<Nav.Item href='/personal-info' className='link'>
				Personal Info
			</Nav.Item>
			<Nav.Item href='/settings' className='link'>
				Settings
			</Nav.Item>
			<Nav.Item className='link' onSelect={() => setSelectNotifications(!selectNotifications)}>
				<i className='fas fa-bell nav-icon'></i>
			</Nav.Item>
			{selectNotifications && <Notifications />}
			<Nav.Item
				href='/settings'
				className='link'
				onSelect={() => {
					localStorage.removeItem('token');
				}}>
				<i className='fas fa-sign-out-alt nav-icon'></i>
				Logout
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
