import { GET_POSTS_SUCCESS, GET_POSTS_ERROR } from '../Actions/types';

const initialState = {
	posts: null,
	error: null,
	loading: true,
};

const posts = function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_POSTS_SUCCESS:
			return {
				...state,
				posts: payload,
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
		default:
			return state;
	}
};

export default posts;
