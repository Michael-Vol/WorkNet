import React, { useEffect, useState } from 'react';
import './PersonalInfo.scss';
import { PanelGroup, Container, Row, FlexboxGrid, Form, FormGroup, FormControl, ControlLabel, Button, Modal } from 'rsuite';
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
	}, [user, getPersonalInfo]);

	const [personalInfo, setPersonalInfo] = useState({});
	const [addExperience, setAddExperience] = useState(false);
	const { workExperience, education, skills } = personalInfo;
	return (
		<Container>
			<FlexboxGrid justify='start'>
				<FlexboxGrid.Item colspan={4}>
					<PersonalInfoSideNav />
				</FlexboxGrid.Item>
				<FlexboxGrid.Item colspan={20}>
					<PanelGroup accordion>
						<Button className='add-item-btn' onClick={() => setAddExperience(!addExperience)}>
							Add Experience
						</Button>
						<Modal show={addExperience}>
							<Modal.Header>Add Experience</Modal.Header>
							<Modal.Body>
								<h3>Work Experience</h3>
								<Form fluid layout='horizontal'>
									<FormGroup key='form__email'>
										<ControlLabel className='form__label'>
											<i className='fas fa-briefcase form__icon'></i>
											<span>Work Name</span>
										</ControlLabel>
										<FormControl name='name'></FormControl>
									</FormGroup>
									<FormGroup key='form__description'>
										<ControlLabel className='form__label'>
											<i className='fas fa-edit form__icon'></i>
											<span>Description</span>
										</ControlLabel>
										<FormControl componentClass='textarea' name='password'></FormControl>
									</FormGroup>
								</Form>
							</Modal.Body>
							<Modal.Footer>
								<Button appearance='primary' onClick={() => setAddExperience(false)}>
									Ok
								</Button>
								<Button appearance='subtle' onClick={() => setAddExperience(false)}>
									Cancel
								</Button>
							</Modal.Footer>
						</Modal>
						<Row>
							{personalInfo.workExperience &&
								personalInfo.workExperience.map((work) => {
									return <PersonalInfoItem key={work._id} headerName={work.name} text={work.description} />;
								})}
						</Row>
					</PanelGroup>
				</FlexboxGrid.Item>
			</FlexboxGrid>
		</Container>
	);
};

export default PersonalInfo;
