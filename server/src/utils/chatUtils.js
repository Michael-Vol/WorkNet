let users = [];
const addUser = ({ userId, socketId }) => {
	//Validate ids
	if (!userId || !socketId) {
		return {
			error: 'User and Socket Id are required',
		};
	}
	//Check if user is already in chat
	const existingUser = users.find((user) => user.userId === userId);
	if (existingUser) {
		return (existingUser.socketId = socketId);
	}

	//Create and store user
	const user = {
		userId,
		socketId,
	};

	users.push(user);
};

const getSocket = (userId) => {
	const user = users.find((user) => user.userId === userId);
	if (!user) {
		return {
			error: "User is not active / doesn't exist",
		};
	}
	return user.socketId;
};
const getUser = (socketId) => {
	const user = users.find((user) => user.socketId === socketId);
	if (!user) {
		return {
			error: "User is not active / doesn't exist",
		};
	}
	return user.userId;
};

const removeUser = (userId) => {
	const index = users.findIndex((user) => user.userId === userId);
	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
};
const getAllUserIds = () => {
	return users.map((user) => user.userId);
};
module.exports = {
	addUser,
	getSocket,
	getUser,
	removeUser,
	getAllUserIds,
};
