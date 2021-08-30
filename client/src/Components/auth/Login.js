import React, { useState } from 'react';
import './Login.scss';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Form, FormGroup, FormControl, ControlLabel, Icon, Button, ButtonToolbar, Schema } from 'rsuite';
const Login = () => {
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = loginData;
	const { StringType } = Schema.Types;
	const model = Schema.Model({
		email: StringType().isRequired('This field is required.').isEmail('Please enter a valid email'),
		email: StringType()
			.isRequired('This field is required')
			.rangeLength(6, 20, 'The number of characters in the password field must be between 6 and 20'),
	});
	return <div>Login</div>;
};

export default Login;
