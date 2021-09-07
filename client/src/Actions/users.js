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

export const getUsers = async (options = {}) => {
	try {
		const { includePersonalInfo } = options;
		let url = '/users';
		console.log(includePersonalInfo);
		if (includePersonalInfo) {
			url = url + '?personalInfo=true';
		}
		console.log(url);
		const res = await axios.get(url);
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
