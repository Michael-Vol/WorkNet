const express = require('express');
const app = express();
const connectDB = require('./config/db');
const userRouter = require('./routers/user');
const postRouter = require('./routers/post');
const chatRouter = require('./routers/chat');
const jobsRouter = require('./routers/jobs');
const cors = require('cors');
const http = require('http');
const fs = require('fs');
const https = require('https');
const path = require('path');
const generateChat = require('./chat/socket');

//Connect to Database
connectDB();

//Generate Chat Socket
const server =
  process.env.CERTIFICATE_REQUIRED == 'true'
    ? https.createServer(
        {
          cert: fs.readFileSync('server/server.crt'),
          key: fs.readFileSync('server/server.key'),
        },
        app
      )
    : http.createServer(app);
generateChat(server);

const PORT = process.env.PORT || 4000;

//Serve up React Static Files
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});
server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});

