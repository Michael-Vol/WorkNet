const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
	path: path.resolve(__dirname, './.env'),
});

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});

		console.log('DB connected...');
	} catch (error) {
		console.error(error); //couldn't connect to DB
		process.exit(1);
	}
};

module.exports = connectDB;
