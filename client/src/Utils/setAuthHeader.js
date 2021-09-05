import axios from 'axios';
const setAuthHeader = () => {
	if (localStorage.token) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
	}
};

export default setAuthHeader;
