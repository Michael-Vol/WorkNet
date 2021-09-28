import { combineReducers } from 'redux';
import auth from './auth';
import personalInfo from './personalInfo';
import users from './users';
import posts from './posts';
import jobs from './jobs';
import chats from './chats';
import connectRequest from './connectRequest';

export default combineReducers({ auth, personalInfo, users, posts, connectRequest, jobs, chats });
