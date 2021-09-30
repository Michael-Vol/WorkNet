import axios from 'axios';
import {
	GET_POSTS_SUCCESS,
	GET_POSTS_ERROR,
	ADD_POST_ERROR,
	ADD_POST_SUCCESS,
	GET_USER_AVATAR_ERROR,
	GET_USER_AVATAR_SUCCESS,
	GET_USER_AVATAR_IN_STATE,
	LIKE_POST_SUCCESS,
	LIKE_POST_ERROR,
	GET_POST_LIKED_SUCCESS,
	GET_POST_LIKED_ERROR,
	GET_LIKES_SUCCESS,
	GET_LIKES_ERROR,
	GET_COMMENTS_SUCCESS,
	GET_COMMENTS_ERROR,
	POST_COMMENT_SUCCESS,
	POST_COMMENT_ERROR,
	GET_REACTIONS_SUCCESS,
	GET_REACTIONS_ERROR,
	READ_REACTION_SUCCESS,
	READ_REACTION_ERROR,
} from './types';
import store from '../store';
export const getPosts = async () => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.get('/posts/personalized', config);
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
		const avatars = store.getState().posts.avatars;
		const avatarIndex = avatars.findIndex((avatar) => avatar.userId === userID);
		if (avatarIndex > -1) {
			return {
				type: GET_USER_AVATAR_IN_STATE,
				payload: { avatar: avatars[avatarIndex].avatar, userId: avatars[avatarIndex].userId },
			};
		}
		const config = {
			responseType: 'arraybuffer',
		};
		const res = await axios.get(`/users/${userID}/avatar`, config);
		const avatar = Buffer.from(res.data).toString('base64');
		return {
			type: GET_USER_AVATAR_SUCCESS,
			payload: { avatar, userId: userID },
		};
	} catch (error) {
		return {
			type: GET_USER_AVATAR_ERROR,
			payload: error,
		};
	}
};

export const likePost = async (postId) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post(`/posts/${postId}/likes`, config);

		return {
			type: LIKE_POST_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		return {
			type: LIKE_POST_ERROR,
			payload: error,
		};
	}
};

export const getPostLiked = async (postId) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.get(`/posts/${postId}/liked`, config);
		return {
			type: GET_POST_LIKED_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		return {
			type: GET_POST_LIKED_ERROR,
			payload: error,
		};
	}
};

export const getLikes = async (postId) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.get(`/posts/${postId}/likes`, config);
		return {
			type: GET_LIKES_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		return {
			type: GET_LIKES_ERROR,
			payload: error,
		};
	}
};

export const getComments = async (postId) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.get(`/posts/${postId}/comments`, config);

		return {
			type: GET_COMMENTS_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		return {
			type: GET_COMMENTS_ERROR,
			payload: error,
		};
	}
};

export const postComment = async (postId, comment) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = JSON.stringify({ body: comment });
		const res = await axios.post(`/posts/${postId}/comments`, body, config);

		return {
			type: POST_COMMENT_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		return {
			type: POST_COMMENT_ERROR,
			payload: error,
		};
	}
};

export const getReactions = async () => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.get(`/posts/all/reactions`, config);

		return {
			type: GET_REACTIONS_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		return {
			type: GET_REACTIONS_ERROR,
			payload: error,
		};
	}
};

export const readReaction = async (reactionID) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post(`/posts/reactions/${reactionID}/read`, config);

		return {
			type: READ_REACTION_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		return {
			type: READ_REACTION_ERROR,
			payload: error,
		};
	}
};
