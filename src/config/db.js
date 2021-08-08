const mongoose = require('mongoose');

console.log(process.env.MONGO_URI);
const mongoURI = process.env.MONGO_URI;

const connectDB = async() => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        console.log('DB connected...');
    } catch (error) {
        console.error(error); //couldn't connect to DB
        process.exit(1);
    }
};

module.exports = connectDB;