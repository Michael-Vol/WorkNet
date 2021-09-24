import axios from 'axios';
import { GET_JOBS_SUCCESS, GET_JOBS_ERROR } from './types';

export const getJobs = async () => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.get('/jobs/', config);
		return {
			type: GET_JOBS_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		return {
			type: GET_JOBS_ERROR,
			payload: error,
		};
	}
};
