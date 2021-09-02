import { GET_PERSONAL_INFO, PERSONAL_INFO_ERROR, POST_PERSONAL_INFO } from '../Actions/types';

const initialState = {
	workExperience: null,
	education: null,
	skills: null,
	loading: true,
	error: null,
};

const personalInfo = function (state = initialState, action) {
	const { type, payload } = action;
	switch (action) {
		case POST_PERSONAL_INFO:
		case GET_PERSONAL_INFO:
			const { workExperience, education, skills } = payload;
			return {
				...state,
				workExperience,
				education,
				skills,
				loading: false,
				error: null,
			};
		case PERSONAL_INFO_ERROR:
			return {
				...state,
				loading: false,
				error: payload,
			};
		default:
			return state;
	}
};

export default personalInfo;
