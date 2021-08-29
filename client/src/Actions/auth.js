import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
//Register User

export const registerUser = async ({ firstName, lastName, email, password, phone, avatar }) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ firstName, lastName, email, password, phone });

	try {
		const res = await axios.post('/users/signup', body, config);
		return {
			type: REGISTER_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		console.error(error);

		return { type: REGISTER_FAIL };
	}
};
