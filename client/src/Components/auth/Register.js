import React, { useState, useEffect, useRef } from 'react';
import './Register.scss';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../Actions/auth';
import { Redirect } from 'react-router-dom';
import {
	Uploader,
	Form,
	FormGroup,
	HelpBlock,
	Button,
	ButtonToolbar,
	Schema,
	Content,
	FlexboxGrid,
	ControlLabel,
	FormControl,
	Icon,
} from 'rsuite';

const Register = (props) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
		phone: '',
	});

	//get global state
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const authError = useSelector((state) => state.auth.error);

	const dispatch = useDispatch();

	//setup local state
	const [avatar, setAvatar] = useState({});
	const [cancel, setCancel] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const formRef = useRef();

	useEffect(() => {
		if (authError) {
			console.log(authError);
			toast.error(authError.response.data.message);
		}
	}, [authError]);

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	if (cancel) {
		return <Redirect to='/' />;
	}

	const { name, email, password, phone } = formData;
	const { StringType } = Schema.Types;

	const model = Schema.Model({
		name: StringType().isRequired('This field is required.'),
		email: StringType().isRequired('This field is required').isEmail('Please enter a valid email address.'),
		password: StringType()
			.isRequired('This field is required')
			.rangeLength(6, 20, 'The number of characters in the password field must be between 6 and 20'),
		password2: StringType()
			.addRule((value, data) => {
				if (value !== data.password) {
					return false;
				}

				return true;
			}, 'The two passwords do not match')
			.isRequired('This field is required.'),
		phone: StringType().isRequired('This field is required'),
	});

	const handleSubmit = async () => {
		console.log(avatar);
		if (!formRef.current.check()) {
			toast.error('Cannot create Account. Check your form information.');
		} else if (Object.keys(avatar).length === 0) {
			toast.error('Please upload an Avatar.');
		} else {
			const [firstName, lastName] = name.split(' ');
			if (!lastName) {
				return toast.error('Please provide a Full Name separated by spaces');
			}
			setSubmitted(true);
			const res = await registerUser({ firstName, lastName, email, password, phone, avatar });
			dispatch(res);
		}
	};

	//test comment

	return (
		<Content className='register'>
			<Toaster position='top-right' toastOptions={{ duration: 2000 }} />
			<FlexboxGrid justify='center'>
				<FlexboxGrid.Item>
					<div className='form--container register--container'>
						<section className='form--title'>
							<i className=' fas fa-pencil-alt fa-lg'></i>
							<span className='form__title'>Register</span>
						</section>
						<Form
							layout='horizontal'
							ref={formRef}
							model={model}
							formValue={formData}
							onChange={(value) => {
								setFormData(value);
							}}>
							<FormGroup key='form__name'>
								<ControlLabel className='form__label'>
									<i className='fas fa-user form__icon'></i>
									<span>Name</span>
								</ControlLabel>
								<FormControl name='name'></FormControl>
								<HelpBlock>Required</HelpBlock>
							</FormGroup>

							<FormGroup key='form__email'>
								<ControlLabel className='form__label'>
									<i className='fas fa-envelope form__icon'></i>
									<span>Email</span>
								</ControlLabel>{' '}
								<FormControl name='email'></FormControl>
								<HelpBlock>Required</HelpBlock>
							</FormGroup>
							<FormGroup key='form__password'>
								<ControlLabel className='form__label'>
									<i className='fas fa-key form__icon'></i>
									<span>Password</span>
								</ControlLabel>
								<FormControl type='password' name='password'></FormControl>
								<HelpBlock>Required</HelpBlock>
							</FormGroup>

							<FormGroup key='form__password2'>
								<ControlLabel className='form__label'>
									<i className='fas fa-key form__icon'></i>
									<span>Verify Password</span>
								</ControlLabel>
								<FormControl type='password' name='password2'></FormControl>
								<HelpBlock>Required</HelpBlock>
							</FormGroup>

							<FormGroup key='form__tel'>
								<ControlLabel className='form__label'>
									<i className='fas fa-phone form__icon'></i>
									<span>Phone Number</span>
								</ControlLabel>{' '}
								<FormControl name='phone'></FormControl>
								<HelpBlock>Required</HelpBlock>
							</FormGroup>

							<FormGroup key='form__avatar'>
								<ControlLabel className='form__label'>
									<i className='fas fa-portrait form__icon'></i>
									<span>Profile Photo</span>
								</ControlLabel>
								<Uploader
									name='avatar'
									autoUpload={false}
									listType='picture'
									multiple={false}
									onChange={(fileList) => {
										setAvatar(fileList[0]);
									}}>
									<button>
										<Icon icon='camera-retro' size='lg' />
									</button>
								</Uploader>
								<HelpBlock>Required</HelpBlock>
							</FormGroup>

							<FormGroup>
								<ButtonToolbar>
									<Button
										className='form--submit-btn'
										type='submit'
										loading={submitted}
										onClick={() => {
											handleSubmit();
										}}
										appearance='primary'>
										Register
									</Button>
									<Button
										className='form--cancel-btn'
										appearance='default'
										onClick={() => {
											setCancel(true);
										}}>
										Cancel
									</Button>
								</ButtonToolbar>
							</FormGroup>
						</Form>
					</div>
				</FlexboxGrid.Item>
			</FlexboxGrid>
		</Content>
	);
};

export default Register;
