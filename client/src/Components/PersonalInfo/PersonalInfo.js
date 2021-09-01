import React from 'react';
import './PersonalInfo.scss';
import { Sidenav, Icon, Sidebar, Container, Nav, Dropdown, FlexboxGrid } from 'rsuite';

const PersonalInfo = () => {
	return (
		<Container>
			<FlexboxGrid justify='start'>
				<FlexboxGrid.Item colspan={4}>
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
				</FlexboxGrid.Item>
			</FlexboxGrid>
		</Container>
	);
};

export default PersonalInfo;
