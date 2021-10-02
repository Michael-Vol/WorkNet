import io from 'socket.io-client';
import { createContext } from 'react';
export const socket = process.env.REACT_APP_WEBSOCKET_URL
	? io(process.env.REACT_APP_WEBSOCKET_URL, { transports: ['websocket'] })
	: io({ transports: ['websocket'] });
export const SocketContext = createContext();
