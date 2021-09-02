import React, { useState, createRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Schema,
	FlexboxGrid,
	Container,
	List,
	Panel,
	Form,
	FormControl,
	FormGroup,
	ControlLabel,
	Button,
	ButtonToolbar,
	Input,
} from 'rsuite';

import './Settings.scss';
const Settings = () => {
	const user = useSelector((state) => state.auth.user);
	const formRef = createRef();
	const { StringType } = Schema.Types;
	const model = Schema.Model({
		email: StringType().isRequired('Please provide an email address').isEmail('Please provide a valid email'),
		password: StringType()
			.isRequired('Please provide a password')
			.rangeLength(6, 20, 'The password should contain between 6 and 20 alphanumeric characters'),
		password2: StringType()
			.isRequired('Please provide a password')
			.rangeLength(6, 20, 'The password should contain between 6 and 20 alphanumeric characters')
			.addRule((value, data) => {
				if (value !== data.password) {
					return false;
				}
				return true;
			}, 'The two passwords do not match'),
	});
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		password2: '',
	});
	const [showEmail, setShowEmail] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [cancel, setCancel] = useState(false);
	const handleSubmit = async () => {
		if (formRef.current.check()) {
			console.log(formData);
		}
	};
	return (
		<Container>
			<FlexboxGrid justify='center'>
				<FlexboxGrid.Item>
					<Panel header='Settings' className='settings-panel'>
						{/* <Panel className='current-settings-panel'>
							<h3>Your Current Settings:</h3>
							<p>Email : </p>
							<p>Password : </p>
						</Panel> */}

						<Form
							fluid
							ref={formRef}
							layout='horizontal'
							formValue={formData}
							onChange={(value) => setFormData(value)}
							model={model}>
							<FormGroup key='form__email'>
								<ControlLabel className='form__label'>
									<i className='fas fa-envelope form__icon'></i>
									<span>Email</span>
								</ControlLabel>
								<FormControl disabled={!showEmail} placeholder={user && user.email} name='email'></FormControl>
								<Button onClick={() => setShowEmail(true)}>Edit</Button>
							</FormGroup>

							<FormGroup key='form__password'>
								<ControlLabel className='form__label'>
									<i className='fas fa-key form__icon'></i>
									<span>Password</span>
								</ControlLabel>
								<FormControl
									type={showPassword ? 'password' : 'text'}
									name='password'
									placeholder='New Password'></FormControl>
								<Button onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Show' : 'Hide'} </Button>
							</FormGroup>
							<FormGroup key='form__password2'>
								<ControlLabel className='form__label'>
									<i className='fas fa-key form__icon'></i>
									<span>Verify Password</span>
								</ControlLabel>
								<FormControl
									name='password2'
									type={showPassword ? 'password' : 'text'}
									placeholder='Verify Password'></FormControl>
							</FormGroup>
							<FormGroup>
								<ButtonToolbar>
									<Button type='submit' onClick={() => handleSubmit()} appearance='primary'>
										Update
									</Button>
									<Button
										appearance='default'
										onClick={() => {
											setCancel(true);
										}}>
										Cancel
									</Button>
								</ButtonToolbar>
							</FormGroup>
						</Form>
					</Panel>
				</FlexboxGrid.Item>
			</FlexboxGrid>
		</Container>
	);
};

export default Settings;
