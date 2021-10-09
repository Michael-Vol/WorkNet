import {
	NEW_CHAT_SUCCESS,
	NEW_CHAT_ERROR,
	GET_CHAT_SUCCESS,
	GET_CHAT_ERROR,
	ADD_NEW_MESSAGE_SUCCESS,
	ADD_NEW_MESSAGE_ERROR,
	GET_MESSAGES_SUCCESS,
	GET_MESSAGES_ERROR,
	RESET_CHAT_MESSAGES,
} from '../Actions/types';

const initialState = {
	chatId: null,
	userId: null,
	loading: true,
	error: null,
	chats: null,
	newMessage: null,
	messages: null,
	loadingMessages: true,
};

const chats = function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case NEW_CHAT_SUCCESS: {
			return {
				...state,
				loading: false,
				error: null,
				chatId: payload.chat_id,
				userId: payload.user_id,
			};
		}
		case NEW_CHAT_ERROR: {
			return {
				...state,
				loading: false,
				error: payload,
				chatId: null,
			};
		}
		case GET_CHAT_SUCCESS: {
			return {
				...state,
				loading: false,
				error: null,
				chats: payload.chats,
			};
		}
		case GET_CHAT_ERROR: {
			return {
				...state,
				loading: false,
				error: payload,
				chats: null,
			};
		}
		case ADD_NEW_MESSAGE_SUCCESS: {
			return {
				...state,
				loading: false,
				error: null,
				newMessage: payload.message,
			};
		}
		case ADD_NEW_MESSAGE_ERROR: {
			return {
				...state,
				loading: false,
				error: payload,
				newMessage: null,
			};
		}
		case GET_MESSAGES_SUCCESS: {
			return {
				...state,
				loadingMessages: false,
				error: null,
				messages: state.messages ? payload.messages.concat(state.messages) : payload.messages,
			};
		}
		case GET_MESSAGES_ERROR: {
			return {
				...state,
				loadingMessages: false,
				loading: false,
				error: payload,
				messages: null,
			};
		}
		case RESET_CHAT_MESSAGES: {
			return {
				...state,
				loadingMessages: true,
				messages: null,
			};
		}
		default:
			return state;
	}
};

export default chats;
