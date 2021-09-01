import React from 'react';
import './PersonalInfo.scss';
import { Sidenav, Icon, Sidebar, Container, Nav, Dropdown } from 'rsuite';

const PersonalInfo = () => {
	return (
		<div className='show-fake-browser sidebar-page'>
			<Container className>
				<Sidebar className='info--sidebar'>
					<Sidenav activeKey='1' className='sidenav--container'>
						<Sidenav.Body>
							<Nav>
								<Nav.Item eventKey='1' active icon={<Icon icon='dashboard' />}>
									Dashboard
								</Nav.Item>
								<Nav.Item eventKey='2' icon={<Icon icon='group' />}>
									User Group
								</Nav.Item>
							</Nav>
						</Sidenav.Body>
					</Sidenav>
				</Sidebar>
			</Container>
		</div>
	);
};

export default PersonalInfo;
