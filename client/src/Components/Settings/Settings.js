import React, { useState, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../../Actions/users';
import { Redirect } from 'react-router';
import { Schema, FlexboxGrid, Container, Panel, Form, FormGroup, Button, ButtonToolbar, ControlLabel, FormControl } from 'rsuite';
import { Toaster, toast } from 'react-hot-toast';
import './Settings.scss';
const Settings = () => {
	const user = useSelector((state) => state.auth.user);
	const formRef = createRef();
	const dispatch = useDispatch();
	const { StringType } = Schema.Types;
	const model = Schema.Model({
		email: StringType().isEmail('Please provide a valid email'),
		password: StringType().rangeLength(6, 20, 'The password should contain between 6 and 20 alphanumeric characters'),
		password2: StringType()
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
			const filledFields = {};
			Object.keys(formData).forEach((field) => {
				if (formData[field] !== '' && field !== 'password2') {
					filledFields[field] = formData[field];
				}
			});
			console.log(filledFields);
			const res = await updateUserInfo(filledFields);
			console.log(res);
			dispatch(res);
			if (res.payload.user) {
				return toast.success('User Settings Updated!');
			}
			toast.error(res.payload.response.data.message);
		}
	};
	if (cancel) {
		return <Redirect to='/dashboard' />;
	}
	return (
		<Container>
			<Toaster position='top-center' toastOptions={{ duration: 2000 }} />
			<FlexboxGrid justify='center'>
				<FlexboxGrid.Item>
					<Panel header='Settings' className='settings-panel'>
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
