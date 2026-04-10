import React from 'react'
import {Button} from '@/components/ui/button'
import {useNavigate } from 'react-router-dom'
import {useInterview} from '../Context/interviewContext'
export const Home = () => {

  const navigate = useNavigate();

  const {setSelectedRole} = useInterview();
  setSelectedRole('');
  return (
    <div className=" min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center text-center gap-4 ">
        <Button className="bg-white shadow-sm rounded-full text-green-500">AI Powered</Button>
        <p className="text-lg md:text-4xl">Practice real tech interviews with AI. <br />
        Land your dream job</p>

        <Button className="p-2 md:p-5" onClick={() => navigate('/job-interviews')}>Start Practicing &rarr;</Button>
      </div>
    </div>
  )
}
