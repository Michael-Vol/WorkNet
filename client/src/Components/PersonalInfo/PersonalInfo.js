import React, { useEffect, useState } from 'react';
import './PersonalInfo.scss';
import { Sidenav, Icon, Sidebar, PanelGroup, Container, Panel, Col, Row, Nav, Dropdown, FlexboxGrid, Button } from 'rsuite';
import PersonalInfoItem from './PersonalInfoItem';
import PersonalInfoSideNav from './PersonalInfoSideNav';
import { getPersonalInfo } from '../../Actions/personalInfo';
import { useDispatch, useSelector } from 'react-redux';
const PersonalInfo = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	useEffect(async () => {
		const res = await getPersonalInfo();
		console.log(res);
		const personalInfo = dispatch(res);
		setPersonalInfo(personalInfo.payload);
	}, [user]);

	const [personalInfo, setPersonalInfo] = useState({});
	const { workExperience, education, skills } = personalInfo;
	return (
		<Container>
			<FlexboxGrid justify='start'>
				<FlexboxGrid.Item colspan={4}>
					<PersonalInfoSideNav />
				</FlexboxGrid.Item>
				<FlexboxGrid.Item colspan={20}>
					<PanelGroup>
						<FlexboxGrid justify='space-around'>
							{personalInfo.workExperience &&
								personalInfo.workExperience.map((work) => {
									return <PersonalInfoItem key={work._id} headerName={work.name} text={work.description} />;
								})}
						</FlexboxGrid>
					</PanelGroup>
				</FlexboxGrid.Item>
			</FlexboxGrid>
		</Container>
	);
};

export default PersonalInfo;
