const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum:['Role', 'JD'],
    required:true,
  },
  selectedRole: String,
  selectedRound: String,
  difficultyLevel: String,

  jobTitle: String,
  interviewType: String,
  jobDescription:String,

  report:{
    type:String,
    required:true
  },
  
},{timestamps: true})

module.exports = mongoose.model('Report', reportSchema);