import {
	GET_JOBS_SUCCESS,
	GET_JOBS_ERROR,
	APPLY_FOR_JOB_SUCCESS,
	APPLY_FOR_JOB_ERROR,
	CHECK_APPLIED_STATUS_ERROR,
	CHECK_APPLIED_STATUS_SUCCESS,
	ADD_JOB_POST_SUCCESS,
	ADD_JOB_POST_ERROR,
	GET_APPLICANTS_SUCCESS,
	GET_APPLICANTS_ERROR,
	SELECT_APPLICANT_SUCCESS,
	SELECT_APPLICANT_ERROR,
} from '../Actions/types';

const initialState = {
	loading: true,
	jobs: null,
	job: null,
	applied: null,
	applicants: null,
	updatedApplicants: false,
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
		case APPLY_FOR_JOB_SUCCESS: {
			return {
				...state,
				loading: false,
				error: null,
				job: payload.job,
			};
		}
		case APPLY_FOR_JOB_ERROR: {
			return {
				...state,
				loading: false,
				job: null,
				error: payload,
			};
		}
		case CHECK_APPLIED_STATUS_SUCCESS: {
			return {
				...state,
				loading: false,
				error: null,
				applied: payload.applied,
			};
		}
		case CHECK_APPLIED_STATUS_ERROR: {
			return {
				...state,
				loading: false,
				error: null,
				applied: null,
			};
		}
		case ADD_JOB_POST_SUCCESS: {
			return {
				...state,
				loading: false,
				error: null,
			};
		}
		case SELECT_APPLICANT_ERROR:
		case ADD_JOB_POST_ERROR: {
			return {
				...state,
				loading: false,
				error: payload,
			};
		}
		case GET_APPLICANTS_SUCCESS: {
			return {
				...state,
				loading: false,
				error: null,
				applicants: payload.applicants,
				updatedApplicants: false,
			};
		}
		case GET_APPLICANTS_ERROR: {
			return {
				...state,
				loading: false,
				error: payload,
				applicants: null,
			};
		}
		case SELECT_APPLICANT_SUCCESS: {
			return {
				...state,
				loading: false,
				error: null,
				updatedApplicants: true,
			};
		}
		default: {
			return state;
		}
	}
};

export default jobs;
