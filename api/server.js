const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const port = 8080;

dotenv.config();

app.use(express.json());

//Mongoose db connection
mongoose
    .connect(process.env.MONGO_URL)
    .then(console.log('Database connection established!'))
    .catch((err) => console.log(err));

// API endpoints
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

app.listen(port, () =>
    console.log(`Social media app listening on port ${port}!`)
);
