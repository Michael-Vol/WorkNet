import { CONNECT_REQUEST_SENT, CONNECT_REQUEST_ERROR } from '../Actions/types';

const initialState = {
	request: null,
	loading: true,
	error: null,
};

function connectRequest(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case CONNECT_REQUEST_SENT:
			const { request } = payload.request;
			return {
				request,
				loading: false,
				error: null,
			};
		case CONNECT_REQUEST_ERROR:
			return {
				status: null,
				request: null,
				loading: false,
				error: payload,
			};
	}
}

export default connectRequest;
