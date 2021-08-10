const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const connectDB = require('./config/db');
const path = require('path');

//Connect to Database
connectDB();

const PORT = process.env.PORT || 1998;

//Use json body parser
app.use(express.json());

app.listen(PORT, () => {
	console.log(`Server is up on port ${PORT}`);
});
