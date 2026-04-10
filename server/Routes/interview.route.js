const express = require('express')
const {GoogleGenerativeAI}  = require('@google/generative-ai')
const dotenv = require('dotenv').config();

const router = express.Router()
const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' }); 


const startInterview = async(req, res)=>{
   try {
    const { context } = req.body;
    console.log("context: ", context);
    const systemMsg = context.find(msg => msg.role === 'Interviewer');

    const chat = model.startChat({
      systemInstruction: systemMsg.content,  
      history: []                           
    });

    const result = await chat.sendMessage('Start the interview, ask the first question.');
    const question = result.response.text();

    return res.status(200).json({ question });

  } catch (error) {
    console.error('Start interview error:', error);
    return res.status(500).json({ error: 'Failed to start interview' });
  }
}
router.post('/start', startInterview);

module.exports = router;