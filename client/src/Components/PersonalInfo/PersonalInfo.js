import React, { useEffect, useState } from 'react';
import './PersonalInfo.scss';
import { Sidenav, Icon, Sidebar, PanelGroup, Container, Panel, Col, Row, Nav, Dropdown, FlexboxGrid, Button } from 'rsuite';
import PersonalInfoItem from './PersonalInfoItem';
import PersonalInfoSideNav from './PersonalInfoSideNav';
import { getPersonalInfo } from '../../Actions/personalInfo';
import { useDispatch } from 'react-redux';
const PersonalInfo = () => {
	const dispatch = useDispatch();
	useEffect(async () => {
		const res = await getPersonalInfo();
		console.log(res);
		const personalInfo = dispatch(res);
		setPersonalInfo(personalInfo.payload);
	}, [getPersonalInfo]);

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
							{personalInfo.workExperience.map((work) => {
								console.log(work);
								return <PersonalInfoItem headerName={work.name} text={work.description} />;
							})}
						</FlexboxGrid>
					</PanelGroup>
				</FlexboxGrid.Item>
			</FlexboxGrid>
		</Container>
	);
};

export default PersonalInfo;
