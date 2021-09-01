import React, { useState, useEffect, useRef } from 'react';
import './Login.scss';
import { loginUser } from '../../Actions/auth';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
	Container,
	Form,
	FormGroup,
	FormControl,
	ControlLabel,
	Button,
	ButtonToolbar,
	Schema,
	Content,
	FlexboxGrid,
	Panel,
} from 'rsuite';
const Login = () => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const authError = useSelector((state) => state.auth.error);
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});
	const [cancel, setCancel] = useState(false);
	const formRef = useRef();

	const { email, password } = loginData;
	const dispatch = useDispatch();

	useEffect(() => {
		if (authError) {
			toast.error(authError.message);
		}
	}, [authError]);

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}
	if (cancel) {
		return <Redirect to='/' />;
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
		}
	};

	return (
		<Content>
			<Toaster position='top-right' toastOptions={{ duration: 4000 }} />
			<FlexboxGrid justify='center'>
				<FlexboxGrid.Item colspan={8}>
					<div className='form--container'>
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
									<FormControl name='password'></FormControl>
								</FormGroup>
								<FormGroup>
									<ButtonToolbar>
										<Button
											// className='form--submit-btn'
											type='submit'
											onClick={() => handleSubmit()}
											appearance='primary'>
											Login
										</Button>
										<Button
											// className='form--cancel-btn'
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
