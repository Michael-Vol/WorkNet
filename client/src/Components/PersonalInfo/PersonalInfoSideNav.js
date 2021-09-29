import React from 'react';
import { Nav, Icon, Sidenav, Icon } from 'rsuite';
import './PersonalInfoSideNav.scss';

const PersonalInfoSideNav = () => {
	return (
		<Sidenav activeKey='1' className='sidenav--container' appearance='inverse'>
			<Sidenav.Body>
				<Nav>
					<Nav.Item eventKey='1' active icon={<Icon icon='dashboard' />}>
						Work Experience
					</Nav.Item>
					<Nav.Item eventKey='2' icon={<Icon icon='group' />}>
						Education
					</Nav.Item>
					<Nav.Item eventKey='3' icon={<Icon icon='group' />}>
						Skills
					</Nav.Item>
				</Nav>
			</Sidenav.Body>
		</Sidenav>
	);
};

export default PersonalInfoSideNav;
