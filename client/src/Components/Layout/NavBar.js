import React from 'react';
import { Navbar, Nav, FlexboxGrid } from 'rsuite';
import { Link } from 'react-router-dom';
import './NavBar.scss';
const NavBar = ({ onSelect, activeKey, ...props }) => {
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
							<Nav.Item>
								<Link to='/login' className='link'>
									Login
								</Link>
							</Nav.Item>
							<Nav.Item>
								<Link to='/register' className='link'>
									Register
								</Link>
							</Nav.Item>
						</Nav>
					</FlexboxGrid>
				</Navbar.Body>
			</Navbar>
		</div>
	);
};

NavBar.propTypes = {};

export default NavBar;
