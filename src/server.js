const express = require('express');
const dotenv = require('dotenv');
const app = express();
const connectDB = require('./config/db');
const path = require('path');

//Connect to Database
connectDB();

const PORT = process.env.PORT || 5000;

//Use json body parser
app.use(express.json());

app.listen(PORT, () => {
	console.log(`Server is up on port ${PORT}`);
});
