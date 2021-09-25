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
	console.log(users);
	if (existingUser) {
		console.log(`replacing ${existingUser.userId} socket ${existingUser.socketId} with ${socketId}`);
		return (existingUser.socketId = socketId);
	}

	//Create and store user
	const user = {
		userId,
		socketId,
	};

	users.push(user);
	console.log(users);
};

const getUser = (userId) => {
	console.log(users);
	const user = users.find((user) => user.userId === userId);
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
