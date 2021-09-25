const express = require('express');
const socketio = require('socket.io');
const User = require('../models/User');
const { createServer } = require('http');
const { addUser, getUser, removeUser } = require('../utils/chatUtils');

const generateChat = (server) => {
	const io = socketio(server);
	io.on('connection', (socket) => {
		console.log('New WebSocket Connection', socket.id);

		socket.on('join', ({ userId }, callback) => {
			console.log(`User ${userId} joined`);
			addUser({ userId, socketId: socket.id });
		});

		socket.on('sendMessage', ({ message, receiver }, callback) => {
			console.log(`got message ${message}`);
			const userSocketId = getUser(receiver);
			io.sockets.socket(userSocketId).emit('message', { message });
		});
	});
};

module.exports = generateChat;
