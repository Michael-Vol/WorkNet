const express = require('express');
const socketio = require('socket.io');
const User = require('../models/User');
const { createServer } = require('http');
const { addUser, getSocket, getUser, getAllUserIds, removeUser, cleanUsers } = require('../utils/chatUtils');

const generateChat = (server) => {
	const io = socketio(server);
	io.on('connection', (socket) => {
		console.log('New WebSocket Connection', socket.id);

		socket.on('join', ({ userId }, callback) => {
			console.log(`User ${userId} joined`);
			addUser({ userId, socketId: socket.id });
			io.sockets.emit('userOnline', getAllUserIds());
		});
		socket.on('sendMessage', ({ message, receiver }, callback) => {
			const userSocketId = getSocket(receiver);
			socket.broadcast.to(userSocketId).emit('message', message);
			callback();
		});
		socket.on('amTyping', ({ receiver }) => {
			const userSocketId = getSocket(receiver);

			socket.broadcast.to(userSocketId).emit('isTyping');
		});
		socket.on('amNotTyping', ({ receiver }) => {
			const userSocketId = getSocket(receiver);
			socket.broadcast.to(userSocketId).emit('isNotTyping');
		});
		socket.on('disconnect', () => {
			const userId = getUser(socket.id);
			console.log(`User ${userId} left`);
			removeUser(userId);
			io.sockets.emit('userOffline', getAllUserIds());
		});
	});
};

module.exports = generateChat;
