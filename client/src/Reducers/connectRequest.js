import {
	CONNECT_REQUEST_SENT,
	CONNECT_REQUEST_ERROR,
	CONNECT_REQUEST_STATUS_SUCCESS,
	CONNECT_REQUEST_STATUS_ERROR,
	GET_MY_REQUESTS_SUCCESS,
	GET_MY_REQUESTS_ERROR,
	ACCEPT_REQUEST_SUCCESS,
	ACCEPT_REQUEST_ERROR,
} from '../Actions/types';

const initialState = {
	status: null,
	request: null,
	requests: null,
	loading: true,
	error: null,
};

const connectRequest = function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case CONNECT_REQUEST_SENT:
			const { request } = payload;
			console.log(request);
			return {
				...state,
				status: request.status,
				request,
				loading: false,
				error: null,
			};
		case CONNECT_REQUEST_ERROR:
		case CONNECT_REQUEST_STATUS_ERROR:
			return {
				...state,
				status: null,
				request: null,
				loading: false,
				error: payload,
			};
		case CONNECT_REQUEST_STATUS_SUCCESS: {
			const { status } = payload;
			return {
				...state,
				status,
				loading: false,
				error: null,
			};
		}
		case GET_MY_REQUESTS_SUCCESS: {
			return {
				...state,
				requests: payload.requests,
				loading: false,
				error: null,
			};
		}
		case GET_MY_REQUESTS_ERROR: {
			return {
				...state,
				error: payload,
				requests: null,
				loading: false,
			};
		}
		case ACCEPT_REQUEST_SUCCESS: {
			return {
				...state,
				request: payload.request,
				error: null,
				loading: false,
			};
		}
		case ACCEPT_REQUEST_ERROR: {
			return {
				...state,
				request: null,
				error: payload,
				loading: false,
			};
		}
		default:
			return state;
	}
};

export default connectRequest;
