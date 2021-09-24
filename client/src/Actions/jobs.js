import axios from 'axios';
import {
	GET_JOBS_SUCCESS,
	GET_JOBS_ERROR,
	APPLY_FOR_JOB_SUCCESS,
	APPLY_FOR_JOB_ERROR,
	CHECK_APPLIED_STATUS_SUCCESS,
	CHECK_APPLIED_STATUS_ERROR,
	ADD_JOB_POST_SUCCESS,
	ADD_JOB_POST_ERROR,
	GET_APPLICANTS_SUCCESS,
	GET_APPLICANTS_ERROR,
	SELECT_APPLICANT_SUCCESS,
	SELECT_APPLICANT_ERROR,
} from './types';

export const getJobs = async () => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.get('/jobs/', config);
		return {
			type: GET_JOBS_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		return {
			type: GET_JOBS_ERROR,
			payload: error,
		};
	}
};

export const applyJob = async (jobId) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.patch(`/jobs/${jobId}/apply`, config);

		return {
			type: APPLY_FOR_JOB_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		return {
			type: APPLY_FOR_JOB_ERROR,
			payload: error,
		};
	}
};

export const checkApplicationStatus = async (jobId) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.get(`/jobs/${jobId}/check_application`, config);

		return { type: CHECK_APPLIED_STATUS_SUCCESS, payload: res.data };
	} catch (error) {
		return {
			type: CHECK_APPLIED_STATUS_ERROR,
			error: error,
		};
	}
};

export const addJob = async (data) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = JSON.stringify(data);

		const res = await axios.post('/jobs/', body, config);

		return {
			type: ADD_JOB_POST_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		return {
			type: ADD_JOB_POST_ERROR,
			payload: error,
		};
	}
};

export const getApplicants = async (jobId) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.get(`/jobs/${jobId}/applicants`, config);

		return {
			type: GET_APPLICANTS_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		return {
			type: GET_APPLICANTS_ERROR,
			payload: error,
		};
	}
};

export const selectApplicant = async (jobId, applicantId) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = JSON.stringify({ applicantId });

		const res = await axios.patch(`/jobs/${jobId}/close`, body, config);

		return {
			type: SELECT_APPLICANT_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		return {
			type: SELECT_APPLICANT_ERROR,
			payload: error,
		};
	}
};
