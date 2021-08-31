import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL } from './types';
//Register User

export const registerUser = async ({ firstName, lastName, email, password, phone, avatar }) => {
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	};
	const textFields = {
		firstName,
		lastName,
		email,
		password,
		phoneNumber: phone,
	};
	const formData = new FormData();
	formData.append('avatar', avatar.blobFile);

	for (const key in textFields) {
		formData.append(key, textFields[key]);
	}
	//formData.append('data', { firstName, lastName, email, password, phoneNumber: phone });

	try {
		const res = await axios.post('/users/signup', formData, config);
		return {
			type: REGISTER_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		console.error(error);

		return { type: REGISTER_FAIL };
	}
};

//Login User

export const loginUser = async ({ email, password }) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post('/users/login', body, config);
		return {
			type: LOGIN_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		console.error(error);

		return {
			type: LOGIN_FAIL,
			payload: error.response.data,
		};
	}
};
