import {
	CONNECT_REQUEST_SENT,
	CONNECT_REQUEST_ERROR,
	CONNECT_REQUEST_STATUS_SUCCESS,
	CONNECT_REQUEST_STATUS_ERROR,
	GET_MY_REQUESTS_SUCCESS,
	GET_MY_REQUESTS_ERROR,
	ACCEPT_REQUEST_SUCCESS,
	ACCEPT_REQUEST_ERROR,
} from './types';

import axios from 'axios';

export const connectRequest = async (userId) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.post(`/users/${userId}/connect`, config);

		return {
			type: CONNECT_REQUEST_SENT,
			payload: res.data,
		};
	} catch (error) {
		// console.error('response', error);

		return {
			type: CONNECT_REQUEST_ERROR,
			payload: error,
		};
	}
};

export const getConnectRequestStatus = async (userId) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.get(`/users/${userId}/connect/status`, config);
		console.log('response', res);
		return {
			type: CONNECT_REQUEST_STATUS_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		return {
			type: CONNECT_REQUEST_STATUS_ERROR,
			payload: error,
		};
	}
};

export const getMyRequests = async (status) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		let url = '';
		status ? (url = `/users/me/connect?status=${status}`) : (url = `/users/me/connect`);
		const res = await axios.get(url, config);

		return {
			type: GET_MY_REQUESTS_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		return {
			type: GET_MY_REQUESTS_ERROR,
			payload: error,
		};
	}
};

export const updateRequest = async (userId, accept = true) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.patch(`/users/${userId}/connect?accept=${accept}`);

		return {
			type: GET_MY_REQUESTS_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		return {
			type: ACCEPT_REQUEST_ERROR,
			payload: error,
		};
	}
};
