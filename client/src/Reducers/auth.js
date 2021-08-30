import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL } from '../Actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	loading: true,
	user: null,
	error: null,
};

const auth = function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload.user,
				error: null,
			};
		case LOGIN_FAIL:
		case REGISTER_FAIL:
			localStorage.removeItem('token');
			return {
				...state,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: payload,
			};
		default:
			return state;
	}
};

export default auth;
