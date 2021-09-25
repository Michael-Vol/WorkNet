const express = require('express');
const app = express();
const connectDB = require('./config/db');
const userRouter = require('./routers/user');
const postRouter = require('./routers/post');
const chatRouter = require('./routers/chat');
const jobsRouter = require('./routers/jobs');
const cors = require('cors');
const http = require('http');
const generateChat = require('./chat/socket');

//Connect to Database
connectDB();

//Generate Chat Socket
const server = http.createServer(app);
generateChat(server);

const PORT = process.env.PORT || 5000;

//Use json body parser
app.use(express.json());
//Setup CORS for Cross-Origin
app.use(cors());
//Setup Routes

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/chats', chatRouter);
app.use('/jobs', jobsRouter);

server.listen(PORT, () => {
	console.log(`Server is up on port ${PORT}`);
});
