import axios from 'axios';
import {
	GET_POSTS_SUCCESS,
	GET_POSTS_ERROR,
	ADD_POST_ERROR,
	ADD_POST_SUCCESS,
	GET_USER_AVATAR_ERROR,
	GET_USER_AVATAR_SUCCESS,
} from './types';

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

export const addPost = async (formData) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = JSON.stringify(formData);
		const res = await axios.post('/posts', body, config);

		return {
			type: ADD_POST_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		return {
			type: ADD_POST_ERROR,
			payload: error,
		};
	}
};

export const getAvatar = async (userID) => {
	try {
		const config = {
			responseType: 'arraybuffer',
		};
		console.log(userID);
		const res = await axios.get(`/users/${userID}/avatar`, config);
		// const avatar = res.data;
		const avatar = Buffer.from(res.data).toString('base64');
		return {
			type: GET_USER_AVATAR_SUCCESS,
			payload: avatar,
		};
	} catch (error) {
		return {
			type: GET_USER_AVATAR_ERROR,
			payload: error,
		};
	}
};
