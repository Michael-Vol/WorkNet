import { combineReducers } from 'redux';
import auth from './auth';
import personalInfo from './PersonalInfo';

export default combineReducers({ auth, personalInfo });
