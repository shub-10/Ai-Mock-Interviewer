const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();
const connectDatabase = require('./utils/db');
const AuthRouter = require('./Routes/auth.route');

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND
}))


app.use('/api/v2/auth', AuthRouter);
const PORT = process.env.PORT

connectDatabase().then(()=>{
  app.listen(PORT, ()=>{console.log("server started..")});
})