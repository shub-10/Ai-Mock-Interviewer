const express = require('express')
const Groq = require('groq-sdk');
const dotenv = require('dotenv').config();

const router = express.Router()
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });


const formatMessages = (context) => {
  return context.map(msg => ({
    role: msg.role === 'User' ? 'user' : 'assistant',
    content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)
  }));
}
const startInterview = async(req, res)=>{
   try {
    const { context } = req.body;
    // console.log("context: ", context);
    const systemMsg = context.find(msg => msg.role === 'Interviewer');

     const response = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',  
      max_tokens: 1024,
      messages: [
        { role: 'system', content: systemMsg.content },
        { role: 'user', content: 'Start the interview, ask the first question.' }
      ]
    });

    const question = response.choices[0].message.content;
    return res.status(200).json({ question });

  } catch (error) {
    console.error('Start interview error:', error);
    return res.status(500).json({ error: 'Failed to start interview' });
  }
}

const respondInterview = async (req, res) => {
  try {
    const { context } = req.body;

    if (!context || context.length === 0) {
      return res.status(400).json({ error: 'Context is required' });
    }

    const systemMsg = context.find(msg => msg.role === 'Interviewer');
    const conversationHistory = context.filter(msg => msg.role !== 'Interviewer');
    const formattedMessages = formatMessages(conversationHistory);

    const response = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      messages: [
        { role: 'system', content: systemMsg.content },
        ...formattedMessages   
      ]
    });

    const question = response.choices[0].message.content;
    return res.status(200).json({ question });

  } catch (error) {
    console.error('Respond error:', error);
    return res.status(500).json({ error: 'Failed to get next question' });
  }
}

const endInterview = async(req, res)=>{
  try {
    const {context} = req.body
    
    if(!context || context.length == 0) return res.status(400).json({error: 'Context is needed'})

    const systemMsg = context.find(msg => msg.role === 'Interviewer')

    const conversationHistory = context.filter(msg => msg.role !== 'Interviewer')

    const formattedMessages = formatMessages(conversationHistory);
    const response = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      messages: [
        { role: 'system', content: systemMsg.content },
        ...formattedMessages   
      ]
    });

    const report  = response.choices[0].message.content;
    return res.status(200).json({ report });

  } catch (error) {
    
  }
}
router.post('/start', startInterview);
router.post('/respond', respondInterview);
router.post('/end', endInterview);
module.exports = router;