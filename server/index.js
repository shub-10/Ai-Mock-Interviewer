const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors');
const connectDatabase = require('./utils/db')
const AuthRouter = require('./Routes/auth.route')
const interviewRouter = require('./Routes/interview.route')


const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

app.use('/health', (req, res) => {
  res.send("Backend is running..")
})
app.use('/api/v2/auth', AuthRouter);
app.use('/api/v2/interview', interviewRouter);


const PORT = process.env.PORT

connectDatabase().then(() => {
  app.listen(PORT, () => { console.log("server started..") });
})