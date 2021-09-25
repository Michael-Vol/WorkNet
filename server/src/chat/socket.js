const express = require('express');
const socketio = require('socket.io');
const User = require('../models/User');
const { createServer } = require('http');

const generateChat = (server) => {
	const io = socketio(server);
	io.on('connection', (socket) => {
		console.log('New WebSocket Connection', socket.id);

		socket.on('join', ({ user }, callback) => {
			console.log(`User ${user} joined`);
		});

		socket.on('sendMessage', ({ message }, callback) => {
			console.log(`got message ${message}`);
		});
	});
};

module.exports = generateChat;
