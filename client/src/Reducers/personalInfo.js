import { GET_MY_PERSONAL_INFO, PERSONAL_INFO_ERROR, POST_PERSONAL_INFO, GET_PERSONAL_INFO } from '../Actions/types';

const initialState = {
	name: null,
	workExperience: null,
	education: null,
	skills: null,
	loading: true,
	error: null,
}; //define initial state

const personalInfo = function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case POST_PERSONAL_INFO:
		case GET_MY_PERSONAL_INFO:
		case GET_PERSONAL_INFO:
			const { workExperience, education, skills } = payload;
			if (payload.firstName) {
				const { firstName, lastName } = payload;
				return {
					...state,
					workExperience,
					education,
					skills,
					name: firstName.concat(' ', lastName),
					loading: false,
					error: null,
				};
			}
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
