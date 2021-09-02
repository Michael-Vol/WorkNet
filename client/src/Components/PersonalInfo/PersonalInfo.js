import React, { useEffect, useState, useRef } from 'react';
import './PersonalInfo.scss';
import {
	PanelGroup,
	Container,
	Row,
	Col,
	FlexboxGrid,
	Form,
	ButtonGroup,
	FormGroup,
	List,
	Panel,
	FormControl,
	ControlLabel,
	Schema,
	Button,
	ButtonToolbar,
	Modal,
} from 'rsuite';
import PersonalInfoItem from './PersonalInfoItem';
import PersonalInfoSideNav from './PersonalInfoSideNav';
import { getPersonalInfo, postPersonalInfo } from '../../Actions/personalInfo';
import { useDispatch, useSelector } from 'react-redux';
const PersonalInfo = () => {
	const formRef = useRef();
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
	const [formData, setFormData] = useState({});
	const { workExperience, education, skills } = personalInfo;

	const { StringType } = Schema.Types;
	const model = Schema.Model({
		name: StringType().isRequired('This field is required'),
		description: StringType().isRequired('This field is required'),
	});

	const handleSubmit = async () => {
		if (formRef.current.check()) {
			const res = await postPersonalInfo({ workExperience: formData });
			console.log(res);
		}
	};
	return (
		<Container>
			{/* <FlexboxGrid.Item colspan={4}>
					<PersonalInfoSideNav />
				</FlexboxGrid.Item> */}
			{/* <Button className='add-item-btn' onClick={() => setAddExperience(!addExperience)}>
				Add Experience
			</Button> */}
			<ButtonGroup style={{ marginTop: 12 }} justified>
				<Button onClick={() => setAddExperience(!addExperience)} appearance='primary' className='add-item-btn'>
					Add Work Experience
				</Button>
				<Button onClick={() => setAddExperience(!addExperience)} appearance='primary' className='add-item-btn'>
					Add Education
				</Button>
				<Button onClick={() => setAddExperience(!addExperience)} appearance='primary' className='add-item-btn'>
					Add Skills
				</Button>
			</ButtonGroup>
			<Modal show={addExperience}>
				<Modal.Header>
					<h3>Add Work Experience</h3>
				</Modal.Header>
				<Modal.Body>
					<Form
						fluid
						layout='horizontal'
						ref={formRef}
						model={model}
						formValue={formData}
						onChange={(value) => setFormData(value)}>
						<FormGroup key='form__position'>
							<ControlLabel className='form__label'>
								<i className='fas fa-briefcase form__icon'></i>
								<span>Work Position</span>
							</ControlLabel>
							<FormControl name='name'></FormControl>
						</FormGroup>
						<FormGroup key='form__description'>
							<ControlLabel className='form__label'>
								<i className='fas fa-edit form__icon'></i>
								<span>Description</span>
							</ControlLabel>
							<FormControl componentClass='textarea' name='description'></FormControl>
						</FormGroup>
						<ButtonToolbar>
							<Button appearance='primary' onClick={() => handleSubmit()}>
								Submit
							</Button>
							<Button appearance='subtle' onClick={() => setAddExperience(false)}>
								Cancel
							</Button>
						</ButtonToolbar>
					</Form>
				</Modal.Body>
			</Modal>

			<FlexboxGrid justify='center'>
				<FlexboxGrid.Item colspan={8}>
					<Panel header='Work Experience' shaded className='info--panel'>
						<List hover className='info--list'>
							{personalInfo.workExperience &&
								personalInfo.workExperience.map((work) => {
									return (
										<List.Item className='info--item'>
											<p className='info--item__title'>
												<b>Position:</b> {work.name}
											</p>
											<p>
												<b>Description:</b> {work.description}
											</p>
										</List.Item>
									);
								})}
						</List>
					</Panel>
				</FlexboxGrid.Item>
				<FlexboxGrid.Item colspan={8}>
					<Panel header='Education' shaded className='info--panel'>
						<List hover className='info--list'>
							{personalInfo.workExperience &&
								personalInfo.workExperience.map((work) => {
									return (
										<List.Item className='info--item'>
											<p className='info--item__title'>
												<b>Position:</b> {work.name}
											</p>
											<p>
												<b>Description:</b> {work.description}
											</p>
										</List.Item>
									);
								})}
						</List>
					</Panel>
				</FlexboxGrid.Item>
				<FlexboxGrid.Item colspan={8}>
					<Panel header='Skills' shaded className='info--panel'>
						<List hover className='info--list'>
							{personalInfo.workExperience &&
								personalInfo.workExperience.map((work) => {
									return (
										<List.Item className='info--item'>
											<p className='info--item__title'>
												<b>Position:</b> {work.name}
											</p>
											<p>
												<b>Description:</b> {work.description}
											</p>
										</List.Item>
									);
								})}
						</List>
					</Panel>
				</FlexboxGrid.Item>
			</FlexboxGrid>
		</Container>
	);
};

export default PersonalInfo;
