import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Register.scss';
import {
	Grid,
	Row,
	Col,
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
} from 'rsuite';

const Register = (props) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			alert(`Passwords don't match`);
		} else {
			console.log(formData);
		}
	};
	return (
		<div>
			<Container className='form--container'>
				<section className='form--title'>
					<h3>Register</h3>
				</section>
				<Form onSubmit={(e) => onSubmit(e)}>
					<FormGroup>
						<ControlLabel>Full Name</ControlLabel>
						<FormControl name='name' type='name'></FormControl>
						<HelpBlock>Required</HelpBlock>
					</FormGroup>

					<FormGroup>
						<ControlLabel>Email</ControlLabel>
						<FormControl name='email' type='email' />
						<HelpBlock>Required</HelpBlock>
					</FormGroup>

					<FormGroup>
						<ControlLabel>Password</ControlLabel>
						<FormControl name='password' type='password'></FormControl>
						<HelpBlock>Required</HelpBlock>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Verify-Password</ControlLabel>
						<FormControl name='password2' type='password'></FormControl>
						<HelpBlock>Required</HelpBlock>
					</FormGroup>

					<FormGroup>
						<ControlLabel>Phone Number</ControlLabel>
						<FormControl name='phone' type='tel'></FormControl>
						<HelpBlock>Required</HelpBlock>
					</FormGroup>

					<FormGroup>
						<ControlLabel>Profile Photo</ControlLabel>
						<Uploader multiple listType='picture' action=''>
							<button>
								<Icon icon='camera-retro' size='lg' />
							</button>
						</Uploader>
					</FormGroup>

					<FormGroup>
						<ButtonToolbar>
							<Button className='form--submit-btn' appearance='primary'>
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
