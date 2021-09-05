import { UPDATE_USER_INFO, USER_INFO_ERROR, GET_USERS_SUCCESS, GET_USERS_ERROR } from '../Actions/types';

const initialState = {
	user: null,
	error: null,
	loading: true,
	users: null,
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
		default:
			return state;
	}
};

export default users;
