import React, { useEffect, useState, useRef } from 'react';

import './PersonalInfo.scss';
import {
	Container,
	Row,
	Col,
	Form,
	ButtonGroup,
	FormGroup,
	Schema,
	Button,
	ButtonToolbar,
	Modal,
	Toggle,
	ControlLabel,
	FormControl,
} from 'rsuite';
import PersonalInfoItem from './PersonalInfoItem';
import { getMyPersonalInfo, postPersonalInfo } from '../../Actions/personalInfo';
import { useDispatch, useSelector } from 'react-redux';
const PersonalInfo = () => {
	const formRef = useRef();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);

	const [personalInfo, setPersonalInfo] = useState({});
	const infoCategories = ['Work Experience', 'Education', 'Skills'];
	const [addExperience, setAddExperience] = useState(false);
	const [formFields, setFormFields] = useState({ fields: {}, model: Schema.Model({}) });
	const [currentCategory, setCurrentCategory] = useState('workExperience');
	const [isPublic, setIsPublic] = useState(true);
	const formInitialState = {
		name: '',
		sector: '',
		description: '',
	};
	const [formData, setFormData] = useState(formInitialState);
	const fetchInfo = async () => {
		const res = await getMyPersonalInfo();
		const personalInfo = dispatch(res);
		setPersonalInfo(personalInfo.payload);
	};
	useEffect(() => {
		if (user) {
			fetchInfo();
		}
	}, [user, getMyPersonalInfo]);

	const { StringType } = Schema.Types;
	const handleSubmit = async () => {
		if (formRef.current.check()) {
			setAddExperience(false);

			// formData.sector = formData[sector].toLowerCase();
			const actionData = {};
			switch (currentCategory) {
				case 'workExperience':
					actionData.name = formData.name;
					actionData.description = formData.description;
					actionData.employer = formData.sector;
					actionData.visible = isPublic;
					break;
				case 'education':
					actionData.name = formData.name;
					actionData.description = formData.description;
					actionData.university = formData.sector;
					actionData.visible = isPublic;
					break;
				case 'skills':
					actionData.name = formData.name;
					actionData.visible = isPublic;
					break;
				default:
					actionData.name = formData.name;
					actionData.visible = isPublic;
			}
			console.log(actionData);

			const res = await postPersonalInfo({ [currentCategory]: actionData });
			console.log(res);
			dispatch(res);
			setFormData(formInitialState);
			await fetchInfo();
		}
	};
	const createFormFields = (category) => {
		switch (category) {
			case 'Work Experience':
				formFields.name = 'Position';
				formFields.sector = 'Employer';
				formFields.description = 'Description';
				formFields.icon = <i className='fas fa-briefcase form__icon'></i>;
				return setFormFields({
					fields: formFields,
					model: Schema.Model({
						name: StringType().isRequired('This field is required'),
						sector: StringType().isRequired('This field is required'),
						description: StringType().isRequired('This field is required'),
					}),
				});
			case 'Education':
				formFields.name = 'Field of Study';
				formFields.sector = 'University';
				formFields.description = 'Description';
				formFields.icon = <i className='fas fa-user-graduate form__icon'></i>;
				return setFormFields({
					fields: formFields,
					model: Schema.Model({
						name: StringType().isRequired('This field is required'),
						sector: StringType().isRequired('This field is required'),
						description: StringType().isRequired('This field is required'),
					}),
				});
			case 'Skills':
				formFields.name = 'Skill';
				formFields.icon = <i className='fas fa-tools form__icon'></i>;
				return setFormFields({
					fields: formFields,
					model: Schema.Model({
						name: StringType().isRequired('This field is required'),
					}),
				});
			default:
				return;
		}
	};
	return (
		<Container>
			<ButtonGroup style={{ marginTop: 12 }} justified>
				{infoCategories &&
					infoCategories.map((category) => {
						return (
							<Button
								onClick={() => {
									switch (category) {
										case 'Work Experience':
											setCurrentCategory('workExperience');
											break;
										case 'Education':
											setCurrentCategory('education');
											break;
										case 'Skills':
											setCurrentCategory('skills');
											break;
										default:
											return;
									}
									createFormFields(category);
									setAddExperience(!addExperience);
								}}
								appearance='primary'
								className='add-item-btn'>
								Add {category}
							</Button>
						);
					})}
			</ButtonGroup>
			<Modal
				show={addExperience}
				onHide={() => {
					setFormData(formInitialState);
					setAddExperience(false);
				}}>
				<Modal.Header>
					<h3>Add {currentCategory}</h3>
				</Modal.Header>
				<Modal.Body>
					<Form
						fluid
						layout='horizontal'
						ref={formRef}
						model={formFields.model}
						formValue={formData}
						onChange={(value) => setFormData(value)}>
						<FormGroup key='form__position'>
							<ControlLabel className='form__label'>
								{formFields.fields.icon}
								<span>{formFields.fields.name}</span>
							</ControlLabel>
							<FormControl name='name'></FormControl>
						</FormGroup>
						{formFields.fields.sector && (
							<FormGroup key='form__sector'>
								<ControlLabel className='form__label'>
									<span>{formFields.fields.sector}</span>
								</ControlLabel>
								<FormControl name='sector'></FormControl>
							</FormGroup>
						)}
						{formFields.fields.description && (
							<FormGroup key='form__description'>
								<ControlLabel className='form__label'>
									<i className='fas fa-edit form__icon'></i>
									<span>Description</span>
								</ControlLabel>
								<FormControl componentClass='textarea' name='description'></FormControl>
							</FormGroup>
						)}
						<Row>
							<FormGroup key='form__visible'>
								<ControlLabel className='form__label'>
									<span className='visibility--text'>{isPublic ? 'Public' : 'Private'}</span>
								</ControlLabel>
								<Toggle
									className='visibility--toggle'
									checked={isPublic}
									onChange={() => setIsPublic(!isPublic)}
								/>
							</FormGroup>
						</Row>

						<ButtonToolbar>
							<Button
								appearance='primary'
								onClick={() => {
									handleSubmit();
								}}>
								Submit
							</Button>
							<Button
								appearance='subtle'
								onClick={() => {
									setFormData(formInitialState);
									setAddExperience(false);
								}}>
								Cancel
							</Button>
						</ButtonToolbar>
					</Form>
				</Modal.Body>
			</Modal>
			<Row>
				{infoCategories.map((category, index) => {
					let infoData = {};
					switch (category) {
						case 'Work Experience':
							infoData.data = personalInfo.workExperience;
							infoData.name = 'Position';
							infoData.sector = 'Employer';
							break;
						case 'Education':
							infoData.data = personalInfo.education;
							infoData.name = 'Field of Study';
							infoData.sector = 'University';
							break;
						case 'Skills':
							infoData.data = personalInfo.skills;
							break;
						default:
							infoData.data = personalInfo.workExperience;
							infoData.sector = 'Employer';
							infoData.name = 'Position';
					}

					return (
						<Col md={8}>
							<PersonalInfoItem category={category} key={index} infoData={infoData} />
						</Col>
					);
				})}
			</Row>
		</Container>
	);
};

export default PersonalInfo;
