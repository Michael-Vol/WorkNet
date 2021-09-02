import axios from 'axios';
import { GET_PERSONAL_INFO, PERSONAL_INFO_ERROR, POST_PERSONAL_INFO } from './types';

export const getPersonalInfo = async () => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.get('/users/me/personal-info', config);

		return {
			type: GET_PERSONAL_INFO,
			payload: res.data,
		};
	} catch (error) {
		return {
			type: PERSONAL_INFO_ERROR,
			payload: error,
		};
	}
};

export const postPersonalInfo = async (info) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = JSON.stringify(info);
		const res = await axios.post('/users/me/personal-info', body, config);

		return {
			type: POST_PERSONAL_INFO,
			payload: res.data,
		};
	} catch (error) {
		return {
			type: PERSONAL_INFO_ERROR,
			payload: error,
		};
	}
};
