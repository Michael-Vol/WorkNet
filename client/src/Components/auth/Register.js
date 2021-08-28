import React, { useState, Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import './Register.scss';
import {
	Container,
	Uploader,
	Form,
	FormGroup,
	FormControl,
	ControlLabel,
	HelpBlock,
	Icon,
	Button,
	ButtonToolbar,
	Schema,
} from 'rsuite';

const Register = (props) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
		phone: '',
	});

	const [formError, setFormError] = useState({});

	const formRef = useRef();

	const { name, email, password, password2 } = formData;
	const { StringType } = Schema.Types;

	const model = Schema.Model({
		name: StringType().isRequired('This field is required.'),
		email: StringType().isRequired('This field is required').isEmail('Please enter a valid email address.'),
		password: StringType()
			.isRequired('This field is required')
			.rangeLength(6, 20, 'The number of characters in password field must be between 6 and 20'),
		password2: StringType()
			.addRule((value, data) => {
				console.log(data);

				if (value !== data.password) {
					return false;
				}

				return true;
			}, 'The two passwords do not match')
			.isRequired('This field is required.'),
	});

	function TextField(props) {
		const { name, label, accepter, required, ...rest } = props;
		return (
			<FormGroup key='form'>
				{rest.avatar ? (
					<Fragment>
						<ControlLabel>{label}</ControlLabel>
						<Uploader multiple listType='picture' action=''>
							<button>
								<Icon icon='camera-retro' size='lg' />
							</button>
						</Uploader>
					</Fragment>
				) : (
					<Fragment>
						<ControlLabel>{label}</ControlLabel>

						<FormControl name={name} accepter={accepter} {...rest}></FormControl>
						{required && <HelpBlock>Required</HelpBlock>}
					</Fragment>
				)}
			</FormGroup>
		);
	}

	const onSubmit = async (e) => {
		console.log(formData);
	};
	return (
		<div>
			<Container className='form--container'>
				<section className='form--title'>
					<h3>Register</h3>
				</section>

				<Form
					ref={formRef}
					model={model}
					formValue={formData}
					onChange={(value) => {
						console.log(value);
						setFormData(value);
					}}
					onCheck={(formError) => {
						setFormError(formError);
					}}>
					<FormGroup key='form__name'>
						<ControlLabel>Name</ControlLabel>
						<FormControl name='name'></FormControl>
						<HelpBlock>Required</HelpBlock>
					</FormGroup>

					<FormGroup key='form__email'>
						<ControlLabel>Email</ControlLabel>
						<FormControl name='email'></FormControl>
						<HelpBlock>Required</HelpBlock>
					</FormGroup>
					<FormGroup key='form__password'>
						<ControlLabel>Password</ControlLabel>
						<FormControl name='password'></FormControl>
						<HelpBlock>Required</HelpBlock>
					</FormGroup>

					<FormGroup key='form__password2'>
						<ControlLabel>Verify Password</ControlLabel>
						<FormControl name='password2'></FormControl>
						<HelpBlock>Required</HelpBlock>
					</FormGroup>

					<FormGroup key='form__tel'>
						<ControlLabel>Phone Number</ControlLabel>
						<FormControl name='phone'></FormControl>
						<HelpBlock>Required</HelpBlock>
					</FormGroup>

					<FormGroup key='form__avatar'>
						<ControlLabel>Profile Photo</ControlLabel>
						<Uploader multiple listType='picture' action=''>
							<button>
								<Icon icon='camera-retro' size='lg' />
							</button>
						</Uploader>
					</FormGroup>

					<FormGroup>
						<ButtonToolbar>
							<Button className='form--submit-btn' onClick={onSubmit} appearance='primary'>
								Submit
							</Button>
							<Button className='form--submit-btn' appearance='default'>
								Cancel
							</Button>
						</ButtonToolbar>
					</FormGroup>
				</Form>
			</Container>
		</div>
	);
};

Register.propTypes = {};

export default Register;
