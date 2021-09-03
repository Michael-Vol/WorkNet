import { UPDATE_USER_INFO, USER_INFO_ERROR } from '../Actions/types';

const initialState = {
	user: null,
	error: null,
	loading: true,
};
const userInfo = function (state = initialState, action) {
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
		default:
			return state;
	}
};

export default userInfo;
