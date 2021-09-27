import React, { Fragment, useState, useEffect } from 'react';
import { Navbar, Nav, FlexboxGrid, Badge } from 'rsuite';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Notifications from '../Notifications/Notifications';
import { getMyRequests } from '../../Actions/connectRequests';
import { getReactions } from '../../Actions/posts';
import './NavBar.scss';
const NavBar = ({ onSelect, activeKey, ...props }) => {
	const [selectNotifications, setSelectNotifications] = useState(false);

	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.user);
	const myRequests = useSelector((state) => state.connectRequest.requests);
	const myReactions = useSelector((state) => state.posts.reactions);
	const reactionsUpdated = useSelector((state) => state.posts.reactionsUpdated);

	const dispatch = useDispatch();
	const adminLinks = (
		<div>
			<Nav.Item href='/adminpanel' className='link'>
				Administrator Panel
			</Nav.Item>
			<Nav.Item
				href='/'
				className='link'
				onSelect={() => {
					localStorage.removeItem('token');
				}}>
				<i className='fas fa-sign-out-alt nav-icon'></i>
				Logout
			</Nav.Item>
		</div>
	);
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

	const fetchRequests = async () => {
		const res = await getMyRequests('Pending');
		dispatch(res);
	};

	const fetchReactions = async () => {
		const res = await getReactions();
		dispatch(res);
	};

	useEffect(async () => {
		if (user) {
			await fetchRequests();
			await fetchReactions();
		}
	}, [user]);

	useEffect(async () => {
		if (!reactionsUpdated) {
			await fetchReactions();
		}
	}, [reactionsUpdated]);

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
				<i className='fas fa-bell nav-icon notifications--icon'>
					{myRequests &&
						myReactions &&
						(myRequests.length > 0 || myReactions.likes.length > 0 || myReactions.comments.length > 0) && (
							<Badge
								className='notifications--badge'
								content={myRequests.length + myReactions.likes.length + myReactions.comments.length}
							/>
						)}
				</i>
			</Nav.Item>
			{selectNotifications && <Notifications />}
			<Nav.Item
				href='/'
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
							<Fragment>{isAuthenticated && user ? (user.isAdmin ? adminLinks : authLinks) : guestLinks}</Fragment>
						</Nav>
					</FlexboxGrid>
				</Navbar.Body>
			</Navbar>
		</div>
	);
};

NavBar.propTypes = {};

export default NavBar;
