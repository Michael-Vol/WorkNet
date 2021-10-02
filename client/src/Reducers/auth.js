import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR } from '../Actions/types';
import setAuthHeader from '../Utils/setAuthHeader';
import { io } from 'socket.io-client';
const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: !!localStorage.getItem('token'),
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
			setAuthHeader();
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload.user,
				error: null,
				token: localStorage.getItem('token'),
			};
		case LOGIN_FAIL:
		case REGISTER_FAIL:
		case AUTH_ERROR:
			localStorage.removeItem('token');
			return {
				...state,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: payload,
			};
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload,
				error: null,
			};
		default:
			return state;
	}
};

export default auth;
