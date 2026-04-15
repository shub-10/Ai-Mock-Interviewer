const express = require('express')
const Groq = require('groq-sdk');
const dotenv = require('dotenv').config();
const Report = require('../Models/reports.model')
const authMiddleware = require('../Middlewares/auth.middleware')
const rateLimiterMiddleware = require('../Middlewares/ratelimiter.middleware')
const redis = require('../utils/redis')


const router = express.Router()
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });


const formatMessages = (context) => {
  return context.map(msg => ({
    role: msg.role === 'User' ? 'user' : 'assistant',
    content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)
  }))
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
    return res.status(200).json({ question })

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
    const {context, interviewCategory, jobTitle, interviewType, jobDescription, selectedRole, selectedRound, difficultyLevel} = req.body

    const userId = req.user.id;
    
    if(!context || context.length == 0) return res.status(400).json({error: 'Context is needed'})
    
    const systemMsg = context.find(msg => msg.role === 'Interviewer')
    console.log(context, systemMsg)
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
   

    const report  = response.choices[0].message.content
     const interviewData = {
      userId, category:interviewCategory, report,
      ...(interviewCategory === 'Role')?{selectedRole, selectedRound, difficultyLevel}:{jobTitle, interviewType, jobDescription }
    }
    await Report.create(interviewData)
    await redis.del(`report:${userId}`)
    return res.status(200).json({ message:"Thankyou for taking the Interview. Check your performance in Report section"})

  } catch (error) {
     console.error('Respond error:', error);
    return res.status(500).json({ error: 'Failed to get the response' })
  }
}

const interviewReports = async(req, res)=>{
  try {
    const userId = req.user.id
    const key = `report:${userId}`
    const cachedreports = await redis.get(key)

    if(cachedreports){
      return res.status(200).json({message:"Reports fetched succe....", Reports: cachedreports})
    }
    const reports = await Report.find({userId: {$eq: userId}})
    await redis.set(key, JSON.stringify(reports), {ex: 3600})
    return res.status(200).json({message:"Reports fetched succe....", Reports: reports})
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({message: "Failed to fetch reports..."})
  }
}


router.post('/start', authMiddleware, rateLimiterMiddleware, startInterview)
router.post('/respond', authMiddleware, respondInterview)
router.post('/end', authMiddleware, endInterview)
router.get('/reports', authMiddleware, interviewReports)

module.exports = router;