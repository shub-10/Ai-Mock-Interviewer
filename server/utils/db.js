const mongoose = require('mongoose');

const connectDatabase = async()=>{
  try {
    const MONGODB_URL = process.env.MONGODB_URL;
    await mongoose.connect(MONGODB_URL)
    console.log("database connection is done..")
  } catch (error) {
    console.log(error.message || "mongodb connection failed..")
  }
}

module.exports = connectDatabase;