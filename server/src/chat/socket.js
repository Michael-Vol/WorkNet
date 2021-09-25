const express = require('express');
const socketio = require('socket.io');
const User = require('../models/User');
const { createServer } = require('http');
const { addUser, getUser, removeUser, cleanUsers } = require('../utils/chatUtils');

const generateChat = (server) => {
	const io = socketio(server);
	io.on('connection', (socket) => {
		console.log('New WebSocket Connection', socket.id);

		socket.on('join', ({ userId }, callback) => {
			console.log(`User ${userId} joined`);
			addUser({ userId, socketId: socket.id });
		});

		socket.on('sendMessage', ({ message, receiver }, callback) => {
			console.log(receiver);
			const userSocketId = getUser(receiver);
			console.log('before send', userSocketId, message);
			socket.broadcast.to(userSocketId).emit('message', { message });
		});
	});
};

module.exports = generateChat;
