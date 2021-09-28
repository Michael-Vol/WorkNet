const express = require('express');
const app = express();
const connectDB = require('./config/db');
const userRouter = require('./routers/user');
const postRouter = require('./routers/post');
const chatRouter = require('./routers/chat');
const jobsRouter = require('./routers/jobs');
const cors = require('cors');
const http = require('http');
const path = require('path');
const generateChat = require('./chat/socket');

//Connect to Database
connectDB();

//Generate Chat Socket
const server = http.createServer(app);
generateChat(server);

const PORT = process.env.PORT || 5000;

//Serve up React Static Files
console.log(path.join(__dirname, '..', '..', 'client/build'));
app.use(express.static(path.join(__dirname, '..', '..', 'client/build')));

//Use json body parser
app.use(express.json());
//Setup CORS for Cross-Origin
app.use(cors());
//Setup Routes

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/chats', chatRouter);
app.use('/api/jobs', jobsRouter);

//Catch-all handler
// app.get('*', (req, res) => {
// 	let url = path.join(__dirname, '..', '..', 'client/build', 'index.html');
// 	console.log(url);
// 	if (!url.startsWith('/app/')) url = url.substring(1);
// 	console.log(url);
// 	res.sendFile(url);
// });
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});
server.listen(PORT, () => {
	console.log(`Server is up on port ${PORT}`);
});
