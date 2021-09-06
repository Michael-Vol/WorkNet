import {
	GET_POSTS_SUCCESS,
	GET_POSTS_ERROR,
	ADD_POST_SUCCESS,
	ADD_POST_ERROR,
	GET_USER_AVATAR_ERROR,
	GET_USER_AVATAR_SUCCESS,
} from '../Actions/types';

const initialState = {
	posts: null,
	post: null,
	error: null,
	loading: true,
};

const posts = function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_POSTS_SUCCESS:
			return {
				...state,
				posts: payload.posts,
				error: null,
				loading: false,
			};
		case GET_POSTS_ERROR:
			return {
				...state,
				posts: null,
				error: payload,
				loading: false,
			};
		case ADD_POST_SUCCESS:
			return {
				...state,
				post: payload,
				error: null,
				loading: false,
			};
		case ADD_POST_ERROR:
			return {
				...state,
				post: null,
				error: payload,
				loading: false,
			};
		case GET_USER_AVATAR_SUCCESS:
			return {
				...state,
				error: null,
				loading: false,
			};
		case GET_USER_AVATAR_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		default:
			return state;
	}
};

export default posts;