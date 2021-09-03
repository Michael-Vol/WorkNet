import axios from 'axios';
import { UPDATE_USER_INFO, USER_INFO_ERROR } from './types';

export const updateUserInfo = async (userInfo) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = JSON.stringify(userInfo);
		const res = await axios.post('/users/me', body, config);

		return {
			type: UPDATE_USER_INFO,
			payload: res.data,
		};
	} catch (error) {
		return {
			type: USER_INFO_ERROR,
			payload: error,
		};
	}
};
