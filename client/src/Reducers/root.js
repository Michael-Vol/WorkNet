import { combineReducers } from 'redux';
import auth from './auth';
import personalInfo from './PersonalInfo';
import userInfo from './UserInfo';
import posts from './Posts';

export default combineReducers({ auth, personalInfo, userInfo, posts });
