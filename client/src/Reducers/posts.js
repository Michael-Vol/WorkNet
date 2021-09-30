import {
	GET_POSTS_SUCCESS,
	GET_POSTS_ERROR,
	ADD_POST_SUCCESS,
	ADD_POST_ERROR,
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
} from '../Actions/types';

const initialState = {
	posts: null,
	post: null,
	error: null,
	loading: true,
	liked: null,
	likes: null,
	comments: null,
	reactions: null,
	reactionsUpdated: true,
	avatars: [],
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
		case GET_USER_AVATAR_IN_STATE:
			return {
				...state,
				error: null,
				loading: false,
			};
		case GET_USER_AVATAR_SUCCESS:
			return {
				...state,
				error: null,
				loading: false,
				avatars: [...state.avatars, { avatar: payload.avatar, userId: payload.userId }],
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
		case GET_LIKES_SUCCESS: {
			return {
				...state,
				error: null,
				loading: false,
				likes: payload.likes,
			};
		}
		case GET_LIKES_ERROR: {
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
		case READ_REACTION_ERROR:
		case POST_COMMENT_ERROR: {
			return {
				...state,
				loading: false,
				error: payload,
			};
		}
		case GET_REACTIONS_SUCCESS: {
			return {
				...state,
				loading: false,
				error: null,
				reactions: payload,
				reactionsUpdated: true,
			};
		}
		case GET_REACTIONS_ERROR: {
			return {
				...state,
				loading: false,
				error: payload,
				reactions: null,
			};
		}
		case READ_REACTION_SUCCESS: {
			return {
				...state,
				loading: false,
				error: null,
				reactionsUpdated: false,
			};
		}
		default:
			return state;
	}
};

export default posts;
