import { REGISTER_SUCCESS, REGISTER_FAIL } from '../Actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	loading: true,
	user: null,
};

const auth = function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case REGISTER_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload.user,
			};
			break;
		case REGISTER_FAIL:
			console.log(payload);
			localStorage.removeItem('token');
			return {
				...state,
				isAuthenticated: false,
				loading: false,
				user: null,
			};
			break;
		default:
			return state;
	}
};

export default auth;
