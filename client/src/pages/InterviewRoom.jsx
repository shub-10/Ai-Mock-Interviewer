import React from 'react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react';
import { useInterview } from '../Context/interviewContext'
import { useNavigate } from 'react-router-dom'
import { useSpeech } from '../hooks/useSpeech'
import { useSpeechToText } from '../hooks/useSpeechToText'

export const InterviewRoom = () => {
  const { interviewCategory, selectedRole, selectedRound, difficultyLevel, jobTitle, interviewType, jobDescription } = useInterview()
  const { transcript, isListening, startListening, stopListening, resetTranscript  } = useSpeechToText()
  const { speak, stop } = useSpeech()
  const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL
  const [messages, setMessages] = useState([])   
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)
  const [context, setContext] = useState([])
  const navigate = useNavigate()
  const token = localStorage.getItem('Aitoken')

  const addMessage = (role, content) => {
    setMessages(prev => [...prev, { role, content }])
  }
  useEffect(() => {
    if (transcript) setAnswer(transcript)
  }, [transcript])
  useEffect(() => {
    const startInterview = async () => {
      const systemMsg = interviewCategory === 'Role'
        ? { role: "Interviewer", content: `You are interviewing a candidate for ${selectedRole}. This is a ${selectedRound} round at ${difficultyLevel} level. Ask the first question.` }
        : { role: "Interviewer", content: `You are interviewing a candidate for ${jobTitle}. Role type: ${interviewType}. JD: ${jobDescription}` }

      const initialContext = [systemMsg]
      setContext(initialContext)
      setLoading(true)

      const res = await fetch(`${serverBaseUrl}/api/v2/interview/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ context: initialContext })
      })
      if(res.status === 429){
        alert("Daily limit of 2 interview is reached. come back tomorrow")
        navigate(-1) 
        return
      }
      const data = await res.json()
      addMessage('ai', data.question)
      setContext(prev => [...prev, { role: 'Assistant', content: data.question }])
      setLoading(false)
      speak(data.question)
    }
    startInterview()
  }, [])

  const submitAnswer = async () => {
    if (!answer.trim()) return
    resetTranscript()
    addMessage('user', answer)
    const updatedContext = [...context, { role: 'User', content: answer }]
    setContext(updatedContext)
    setAnswer("")
    setLoading(true)

    const res = await fetch(`${serverBaseUrl}/api/v2/interview/respond`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ context: updatedContext })
    })
    const data = await res.json()
    addMessage('ai', data.question)
    setContext(prev => [...prev, { role: 'Assistant', content: data.question }])
    setLoading(false)
    speak(data.question)
  }

  const endInterview = async () => {
    const updatedContext = [...context, { role: 'User', content: answer }, { role: 'User', content: "That's it for today. Give me a full report with my weak spots, keep it short." }]
    setLoading(true)
    const res = await fetch(`${serverBaseUrl}/api/v2/interview/end`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ context: updatedContext, interviewCategory, jobTitle, interviewType, jobDescription, selectedRole, selectedRound, difficultyLevel })
    })
    await res.json()
    setLoading(false)
    navigate('/reports')
  }

  return (
    <div className="min-h-screen bg-gray-950 flex justify-center py-8 px-4">
      <div className="w-full max-w-2xl flex flex-col h-[90vh] bg-gray-900 rounded-xl overflow-hidden border border-white/5">

        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 bg-blue-900 text-blue-300 text-xs">
              <AvatarFallback>RA</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-gray-100">Rab — AI Interviewer</p>

            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs px-2 py-1 rounded-full border border-blue-800/50 text-blue-400 bg-blue-950/30">{selectedRound || interviewType}</span>
            <Button onClick={endInterview} className="text-xs h-7 px-3 bg-red-950/40 hover:bg-red-900/40 text-red-400 border border-red-900/40">
              End interview
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
              {msg.role === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-blue-900/50 flex items-center justify-center text-xs text-blue-300 shrink-0 mt-1">RA</div>
              )}
              <div className={`px-4 py-2.5 rounded-xl text-sm leading-relaxed ${msg.role === 'ai'
                ? 'bg-gray-800 text-gray-300 rounded-tl-sm border border-white/5'
                : 'bg-blue-700 text-blue-50 rounded-tr-sm'
                }`}>
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 self-start">
              <div className="w-7 h-7 rounded-full bg-blue-900/50 flex items-center justify-center text-xs text-blue-300 shrink-0">RA</div>
              <div className="px-4 py-3 bg-gray-800 border border-white/5 rounded-xl rounded-tl-sm flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t border-white/5 flex flex-col gap-3">
          <div className="relative">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={isListening ? "Listening..." : "Type your answer or use the mic..."}
              className="w-full bg-gray-800 border border-white/8 rounded-lg px-4 py-3 pr-12 text-sm text-gray-200 placeholder-gray-600 resize-none h-24 focus:outline-none focus:border-blue-700/50"
            />

            <button
              onClick={isListening ? stopListening : startListening}
              className={`absolute bottom-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isListening
                  ? 'bg-green-700/50 text-green-400 border border-green-700/50'
                  : 'bg-gray-700 text-gray-400 border border-white/10 hover:text-gray-200'
                }`}
            >
              {isListening ? (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <rect x="5" y="1" width="6" height="8" rx="3" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3 8a5 5 0 0 0 10 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="8" y1="13" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={submitAnswer}
              disabled={loading}
              className="bg-blue-700 hover:bg-blue-600 text-sm h-8 px-4"
            >
              Submit answer
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}