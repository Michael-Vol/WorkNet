import axios from 'axios';
import {
	NEW_CHAT_SUCCESS,
	NEW_CHAT_ERROR,
	GET_CHAT_SUCCESS,
	GET_CHAT_ERROR,
	ADD_NEW_MESSAGE_SUCCESS,
	ADD_NEW_MESSAGE_ERROR,
} from './types';

export const createNewChat = async (user) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = JSON.stringify({ user });
		const res = await axios.post('/chats', body, config);

		return {
			type: NEW_CHAT_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		return {
			type: NEW_CHAT_ERROR,
			payload: error,
		};
	}
};

export const getChats = async () => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.get('/chats', config);

		return {
			type: GET_CHAT_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		return {
			type: GET_CHAT_ERROR,
			payload: error,
		};
	}
};

export const addNewMessage = async (message, chatId) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = JSON.stringify({ message });
		const res = await axios.post(`/chats/${chatId}/messages`, body, config);

		return {
			type: ADD_NEW_MESSAGE_SUCCESS,
			payload: res.data,
		};
	} catch (error) {
		return {
			type: ADD_NEW_MESSAGE_ERROR,
			payload: error,
		};
	}
};
