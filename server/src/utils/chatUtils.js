const users = [];

const addUser = ({ userId, socketId }) => {
	//Validate ids
	if (!userId || !socketId) {
		return {
			error: 'User and Socket Id are required',
		};
	}
	//Check if user is already in chat

	if (users.find((user) => user.userId === userId && user.socketId === socketId)) {
		return {
			error: 'User already in chat',
		};
	}

	//Create and store user
	const user = {
		userId,
		socketId,
	};

	users.push(user);
};

const getUser = (userId) => {
	const user = users.find((user) => user === userId);
	if (!user) {
		return {
			error: "User is not active / doesn't exist",
		};
	}
	return user.socketId;
};

const removeUser = (userId) => {
	const index = users.findIndex((user) => user.userId === userId);
	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
};

module.exports = {
	addUser,
	getUser,
	removeUser,
};
