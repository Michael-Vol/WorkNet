import { REGISTER_SUCCESS, REGISTER_FAIL } from '../Actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
};

const auth = function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case REGISTER_SUCCESS:
			console.log(payload);
			break;
		case REGISTER_FAIL:
			console.log(payload);
			break;
		default:
			return state;
	}
};

export default auth;
