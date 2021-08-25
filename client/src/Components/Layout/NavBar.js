import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Icon } from 'rsuite';
import { Link } from 'react-router-dom';
import { FlexboxGrid } from 'rsuite';
import './NavBar.scss';
const NavBar = ({ onSelect, activeKey, ...props }) => {
	return (
		<Navbar {...props}>
			<Navbar.Header>
				<Link to='/' className='navbar-brand logo'>
					<span>WorkNet</span>
				</Link>
			</Navbar.Header>
			<Navbar.Body>
				<FlexboxGrid justify='end'>
					<Nav onSelect={onSelect} activeKey={activeKey}>
						<Nav.Item>
							<Link to='/login'>Login</Link>
						</Nav.Item>
						<Nav.Item>
							<Link to='/register'>Register</Link>
						</Nav.Item>
					</Nav>
				</FlexboxGrid>
			</Navbar.Body>
		</Navbar>
	);
};

NavBar.propTypes = {};

export default NavBar;
