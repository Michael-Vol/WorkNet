import { combineReducers } from 'redux';
import auth from './auth';
import personalInfo from './personalInfo';
import users from './users';
import posts from './posts';

export default combineReducers({ auth, personalInfo, users, posts });
