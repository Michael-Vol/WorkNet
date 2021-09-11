import { CONNECT_REQUEST_SENT, CONNECT_REQUEST_ERROR } from './types';

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
		console.error(error);

		return {
			type: CONNECT_REQUEST_ERROR,
			payload: error,
		};
	}
};
