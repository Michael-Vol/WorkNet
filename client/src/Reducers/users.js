import {
	UPDATE_USER_INFO,
	USER_INFO_ERROR,
	GET_USERS_SUCCESS,
	GET_USERS_ERROR,
	GET_CONNECTED_USERS_SUCCESS,
	GET_CONNECTED_USERS_ERROR,
	GET_FRIENDS_SUCCESS,
	GET_FRIENDS_ERROR,
} from '../Actions/types';

const initialState = {
	user: null,
	error: null,
	loading: true,
	users: null,
	connectedUsers: null,
	connectedUsersLoading: true,
	friends: null,
	friendsLoading: true,
};
const users = function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case UPDATE_USER_INFO:
			return {
				...state,
				loading: false,
				error: null,
				user: payload,
			};
		case USER_INFO_ERROR:
			return {
				...state,
				loading: false,
				error: payload,
				user: null,
			};
		case GET_USERS_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				users: payload.users,
			};
		case GET_USERS_ERROR:
			return {
				...state,
				loading: false,
				error: payload,
				users: null,
			};
		case GET_CONNECTED_USERS_SUCCESS: {
			return {
				...state,
				connectedUsersLoading: false,
				error: null,
				connectedUsers: payload.users,
			};
		}
		case GET_CONNECTED_USERS_ERROR: {
			return {
				...state,
				connectedUsersLoading: false,
				connectedUsers: null,
				error: payload,
			};
		}
		case GET_FRIENDS_SUCCESS: {
			return {
				...state,
				loading: false,
				friendsLoading: false,
				error: null,
				friends: payload.friends,
			};
		}
		case GET_FRIENDS_ERROR: {
			return {
				...state,
				loading: false,
				friendsLoading: false,
				error: payload,
				friends: null,
			};
		}
		default:
			return state;
	}
};

export default users;
