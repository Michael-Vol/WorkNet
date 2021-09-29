import React, { useState, useRef } from 'react';
import { LOGIN_FAIL } from '../../Actions/types';
import './Login.scss';
import { loginUser } from '../../Actions/auth';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, FormGroup, Button, ButtonToolbar, Schema, Content, FlexboxGrid, Panel, ControlLabel, FormControl } from 'rsuite';
const Login = () => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.user);
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});
	const [cancel, setCancel] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const formRef = useRef();

	const { email, password } = loginData;
	const dispatch = useDispatch();

	if (cancel) {
		return <Redirect to='/' />;
	}
	if (isAuthenticated && user) {
		const link = user.isAdmin ? '/adminpanel' : '/dashboard';
		return <Redirect to={link} />;
	}
	const { StringType } = Schema.Types;
	const model = Schema.Model({
		email: StringType().isRequired('This field is required.').isEmail('Please enter a valid email'),
		password: StringType()
			.isRequired('This field is required')
			.rangeLength(6, 20, 'The number of characters in the password field must be between 6 and 20'),
	});

	const handleSubmit = async () => {
		if (formRef.current.check()) {
			const res = await loginUser({ email, password });
			dispatch(res);
			if (res.type === LOGIN_FAIL) {
				console.log(res.payload);
				toast.error(res.payload.data.message);
				setSubmitted(false);
			}
		}
	};

	return (
		<Content className='login'>
			<Toaster position='top-right' toastOptions={{ duration: 2000 }} />
			<FlexboxGrid justify='center'>
				<FlexboxGrid.Item colspan={8}>
					<div className='form--container login--container'>
						<Panel header={<h3>Login</h3>} bordered>
							<Form
								fluid
								ref={formRef}
								layout='horizontal'
								model={model}
								formValue={loginData}
								onChange={(value) => setLoginData(value)}>
								<FormGroup key='form__email'>
									<ControlLabel className='form__label'>
										<i className='fas fa-envelope form__icon'></i>
										<span>Email</span>
									</ControlLabel>
									<FormControl name='email'></FormControl>
								</FormGroup>
								<FormGroup key='form__password'>
									<ControlLabel className='form__label'>
										<i className='fas fa-key form__icon'></i>
										<span>Password</span>
									</ControlLabel>
									<FormControl type='password' name='password'></FormControl>
								</FormGroup>
								<FormGroup>
									<ButtonToolbar>
										<Button
											type='submit'
											loading={submitted}
											onClick={() => {
												setSubmitted(true);
												handleSubmit();
											}}
											appearance='primary'>
											Login
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
					</div>
				</FlexboxGrid.Item>
			</FlexboxGrid>
		</Content>
	);
};

export default Login;
