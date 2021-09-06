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

export const addPost = async (textFields, image) => {
	try {
		const formData = new FormData();
		for (const key in textFields) {
			formData.append(key, textFields[key]);
		}

		if (image) {
			formData.append('image', image.blobFile);
		}

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		console.log(formData);
		const res = await axios.post('/posts', formData, config);

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
		const res = await axios.get(`/users/${userID}/avatar`, config);
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
