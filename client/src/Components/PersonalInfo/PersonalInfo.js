import React, { useEffect, useState, useRef } from 'react';

import './PersonalInfo.scss';
import {
	Container,
	Row,
	Col,
	Form,
	ButtonGroup,
	FormGroup,
	FormControl,
	ControlLabel,
	Schema,
	Button,
	ButtonToolbar,
	Modal,
} from 'rsuite';
import PersonalInfoItem from './PersonalInfoItem';
import { getPersonalInfo, postPersonalInfo } from '../../Actions/personalInfo';
import { useDispatch, useSelector } from 'react-redux';
const PersonalInfo = () => {
	const formRef = useRef();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const loading = useSelector((state) => state.personalInfo.loading);

	const [personalInfo, setPersonalInfo] = useState({});
	const [formSubmitted, setFormSubmitted] = useState(false);
	const infoCategories = ['Work Experience', 'Education', 'Skills'];
	const [addExperience, setAddExperience] = useState(false);
	const [formFields, setFormFields] = useState({ fields: {}, model: Schema.Model({}) });
	const [currentCategory, setCurrentCategory] = useState('workExperience');
	const [formData, setFormData] = useState({
		name: '',
		description: '',
	});
	const fetchInfo = async () => {
		const res = await getPersonalInfo();
		const personalInfo = dispatch(res);
		console.log(personalInfo);
		setPersonalInfo(personalInfo.payload);
	};
	useEffect(async () => {
		if (user) {
			await fetchInfo();
		}
	}, [user, getPersonalInfo]);

	const { StringType } = Schema.Types;
	const handleSubmit = async () => {
		console.log(formData);
		if (formRef.current.check()) {
			const res = await postPersonalInfo({ [currentCategory]: formData });
			console.log(res);
			dispatch(res);
			await fetchInfo();
		}
	};
	const createFormFields = (category) => {
		switch (category) {
			case 'Work Experience':
				formFields.name = 'Position';
				formFields.description = 'Description';
				formFields.icon = <i className='fas fa-briefcase form__icon'></i>;
				return setFormFields({
					fields: formFields,
					model: Schema.Model({
						name: StringType().isRequired('This field is required'),
						description: StringType().isRequired('This field is required'),
					}),
				});
			case 'Education':
				formFields.name = 'Field of Study';
				formFields.description = 'Description';
				formFields.icon = <i className='fas fa-user-graduate form__icon'></i>;
				return setFormFields({
					fields: formFields,
					model: Schema.Model({
						name: StringType().isRequired('This field is required'),
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
									let categoryName = '';
									console.log(category);
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
			<Modal show={addExperience} onHide={() => setAddExperience(false)}>
				<Modal.Header>
					<h3>Add Work Experience</h3>
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
						{formFields.fields.description && (
							<FormGroup key='form__description'>
								<ControlLabel className='form__label'>
									<i className='fas fa-edit form__icon'></i>
									<span>Description</span>
								</ControlLabel>
								<FormControl componentClass='textarea' name='description'></FormControl>
							</FormGroup>
						)}
						<ButtonToolbar>
							<Button
								appearance='primary'
								onClick={() => {
									handleSubmit();
									setAddExperience(false);
								}}>
								Submit
							</Button>
							<Button appearance='subtle' onClick={() => setAddExperience(false)}>
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
							break;
						case 'Education':
							infoData.data = personalInfo.education;
							infoData.name = 'Field of Study';
							break;
						case 'Skills':
							infoData.data = personalInfo.skills;
							break;
						default:
							infoData.data = personalInfo.workExperience;
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
