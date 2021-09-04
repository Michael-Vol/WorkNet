import axios from 'axios';
import { GET_POSTS_SUCCESS, GET_POSTS_ERROR } from './types';

export const getPosts = async () => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.get('/posts', config);
		return {
			type: GET_POSTS_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		console.error(error);
		return { type: GET_POSTS_ERROR, payload: error };
	}
};
