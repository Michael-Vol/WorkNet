import { GET_JOBS_SUCCESS, GET_JOBS_ERROR } from '../Actions/types';

const initialState = {
	loading: true,
	jobs: null,
	job: null,
};

const jobs = function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_JOBS_SUCCESS: {
			return {
				...state,
				loading: false,
				error: null,
				jobs: payload.jobs,
			};
		}
		case GET_JOBS_ERROR: {
			return {
				...state,
				loading: false,
				error: payload,
				jobs: null,
			};
		}
		default: {
			return state;
		}
	}
};

export default jobs;
