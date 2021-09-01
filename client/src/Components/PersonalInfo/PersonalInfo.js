import React from 'react';
import './PersonalInfo.scss';
import { Sidenav, Icon, Sidebar, Container, Nav, Dropdown, FlexboxGrid } from 'rsuite';

const PersonalInfo = () => {
	return (
		<Container className='info--sidebar'>
			<FlexboxGrid justify='start'>
				<FlexboxGrid.Item colspan={8}>
					<Sidebar className='info--sidebar'>
						<Sidenav activeKey='1' className='sidenav--container' appearance='inverse'>
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
				</FlexboxGrid.Item>
			</FlexboxGrid>
		</Container>
	);
};

export default PersonalInfo;
