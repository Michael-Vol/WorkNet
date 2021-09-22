import {
	GET_POSTS_SUCCESS,
	GET_POSTS_ERROR,
	ADD_POST_SUCCESS,
	ADD_POST_ERROR,
	GET_USER_AVATAR_ERROR,
	GET_USER_AVATAR_SUCCESS,
	LIKE_POST_SUCCESS,
	LIKE_POST_ERROR,
	GET_POST_LIKED_SUCCESS,
	GET_POST_LIKED_ERROR,
	GET_LIKES_COUNT_SUCCESS,
	GET_LIKES_COUNT_ERROR,
	GET_COMMENTS_SUCCESS,
	GET_COMMENTS_ERROR,
	POST_COMMENT_SUCCESS,
	POST_COMMENT_ERROR,
} from '../Actions/types';

const initialState = {
	posts: null,
	post: null,
	error: null,
	loading: true,
	liked: null,
	numLikes: null,
	comments: null,
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
		case LIKE_POST_SUCCESS: {
			return {
				...state,
				error: null,
				loading: false,
				liked: payload.liked,
			};
		}
		case GET_POST_LIKED_ERROR:
		case LIKE_POST_ERROR: {
			return {
				...state,
				loading: false,
				error: payload,
				liked: null,
			};
		}
		case GET_POST_LIKED_SUCCESS: {
			return {
				...state,
				error: null,
				loading: false,
				liked: payload.liked,
			};
		}
		case GET_LIKES_COUNT_SUCCESS: {
			return {
				...state,
				error: null,
				loading: false,
				numLikes: payload.likes,
			};
		}
		case GET_LIKES_COUNT_ERROR: {
			return {
				...state,
				error: payload,
				loading: false,
				numLikes: null,
			};
		}
		case GET_COMMENTS_SUCCESS: {
			return {
				...state,
				error: null,
				loading: false,
				comments: payload.comments,
			};
		}
		case GET_COMMENTS_ERROR: {
			return {
				...state,
				comments: null,
				loading: false,
				error: payload,
			};
		}
		case POST_COMMENT_SUCCESS: {
			return {
				...state,
				loading: false,
				error: null,
			};
		}
		case POST_COMMENT_ERROR: {
			return {
				...state,
				loading: false,
				error: payload,
			};
		}
		default:
			return state;
	}
};

export default posts;
