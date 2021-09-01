import axios from 'axios';
import { GET_PERSONAL_INFO, PERSONAL_INFO_ERROR } from './types';

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
