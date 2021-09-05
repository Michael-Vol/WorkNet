import axios from 'axios';
import { UPDATE_USER_INFO, USER_INFO_ERROR, GET_USERS_SUCCESS, GET_USERS_ERROR } from './types';

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

export const getUsers = async () => {
	try {
		const res = await axios.get('/users/');
		return {
			type: GET_USERS_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		return {
			type: GET_USERS_ERROR,
			payload: error,
		};
	}
};
