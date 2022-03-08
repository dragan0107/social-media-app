const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');
const conversationRouter = require('./routes/conversations');
const messageRouter = require('./routes/messages');
const { errorHandler } = require('./utils/errorMiddleware');

const app = express();
const port = 8080;

dotenv.config();

app.use(express.json());

//Mongoose db connection
mongoose
    .connect(process.env.MONGO_URL)
    .then(console.log('Database connection established!'))
    .catch((err) => console.log(err));

// API endpoints
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/conversations', conversationRouter);
app.use('/api/v1/messages', messageRouter);

app.use(errorHandler); // Error handling middleware.

app.listen(port, () =>
    console.log(`Social media app listening on port ${port}!`)
);
