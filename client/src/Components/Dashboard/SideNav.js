import React from 'react';
import { Nav, Icon, Sidenav } from 'rsuite';
import './SideNav.scss';
const SideNav = () => {
	return (
		<Sidenav activeKey='1' appearance='inverse' className='dashboard--sidenav--container'>
			<Sidenav.Body className=''>
				<Nav>
					<Nav.Item className='dashboard--sidenav--item' eventKey='1' icon={<Icon icon='group' />} href='/network'>
						Network
					</Nav.Item>
					<Nav.Item
						className='dashboard--sidenav--item'
						eventKey='2'
						icon={<Icon icon='dashboard' />}
						href='personal-info'>
						Personal Info
					</Nav.Item>
				</Nav>
			</Sidenav.Body>
		</Sidenav>
	);
};

export default SideNav;
