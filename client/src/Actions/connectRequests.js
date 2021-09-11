import {
	CONNECT_REQUEST_SENT,
	CONNECT_REQUEST_ERROR,
	CONNECT_REQUEST_STATUS_SUCCESS,
	CONNECT_REQUEST_STATUS_ERROR,
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
