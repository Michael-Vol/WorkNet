const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const connectDB = require('./config/db');
const path = require('path');
const userRouter = require('./routers/user');
const postRouter = require('./routers/post');
const conversationRouter = require('./routers/conversation');
//Connect to Database
connectDB();

const PORT = process.env.PORT || 5000;

//Use json body parser
app.use(express.json());

//Setup Routes
app.use('/users/', userRouter);
app.use('/posts/', postRouter);
app.use('/conversations/', conversationRouter);

app.listen(PORT, () => {
	console.log(`Server is up on port ${PORT}`);
});
