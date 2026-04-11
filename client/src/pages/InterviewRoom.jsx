import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from 'react';
import { useInterview } from '../Context/interviewContext'
export const InterviewRoom = () => {

  const {interviewCategory, selectedRole, selectedRound, difficultyLevel, jobTitle, interviewType, jobDesc } = useInterview()
  const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL
  const [question, setQuestion] = useState("");
  const [context, setContext] = useState([]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {

    const startInterview = async () => {
      
      const systemMsg = interviewCategory == 'Role'?  { role: "Interviewer", content: `You are interviewing a candidate for ${selectedRole}.This is going to be ${selectedRound} round with ${difficultyLevel} level. Ask the first question` }: { role: "Interviewer", content: `You are interviewing a candidate for ${jobTitle}.Role is for ${interviewType}. Here is the job description ${jobDesc}`}
      // console.log(systemMsg.content);
      const initialContext = [systemMsg];
      setContext(initialContext);
      setLoading(true);
      const res = await fetch(`${serverBaseUrl}/api/v2/interview/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ context: initialContext })
      })
      const data = await res.json();
      setQuestion(data.question)
      setContext(prev=>[...prev, { role: 'Assistant', content: data.question }])
      setLoading(false);
    }
    startInterview();
  }, [])

  const submitAnswer = async () => {
    const updatedContext = [...context, { role: 'User', content: answer} ]
    setContext(updatedContext);
    setAnswer("")
    setLoading(true);
    
    const res = await fetch(`${serverBaseUrl}/api/v2/interview/respond`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context: updatedContext })
    })
    const data = await res.json()
    setContext(prev => [...prev, { role: 'Assistant',content: data.question }])
    setQuestion(data.question); 
    setLoading(false);

  }

  const endInterview = async()=>{
    const updatedContext = [...context,{role: 'User', content: answer}, {role: 'User',content: "That's it for today, will get back soon for next interview, now give me the whole report and tell my weak spots to work on. keep it short and to the point" }]
    setContext(updatedContext);
    setAnswer("");
    setLoading(true);
    const res = await fetch(`${serverBaseUrl}/api/v2/interview/respond`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context: updatedContext })
    })
    const data = await res.json()
    setQuestion(data.question); 
    setLoading(false);
  }
  return (

    <div className=" min-h-screen flex justify-center py-10">

      <div className="w-[90%] md:w-1/2 bg-gray-900 rounded-sm min-h-screen flex flex-col justify-between items-center py-10">

        <div className="flex flex-col items-center gap-2 text-white">
          <Avatar className="w-20 h-20 ">
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
          <p>Hey, I am GW</p>
        </div>
        {
          loading && (<div>Next question is loading</div>)
        }
        <div className="text-white w-[80%] text-sm">{question}</div>
        <div className="w-[80%] flex flex-col gap-2">
          <textarea
            value={answer}
            onChange={(e)=>setAnswer(e.target.value)}
            placeholder="Write your answer.."
            className="border border-gray-200 rounded-md px-3 py-2 text-sm text-white h-48 resize-none focus:outline-none"
          />
          <div className="flex justify-end gap-2">
            <Button className="bg-gray-700" onClick={submitAnswer}>Submit</Button>
            <Button onClick={endInterview} className="bg-red-400 cursor-pointer">End</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
