import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInterview } from '../Context/interviewContext'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../Context/authContext'


export const JdbasedContent = () => {
  const { jobTitle, setJobTitle, jobDescription, setJobDescription, interviewType, setInterviewType } = useInterview()
  const {isloggedIn} = useAuth()
  const navigate = useNavigate();

  const createSlug = (title) => {
    return title.toLowerCase().replace(/\s+/g, "-")
  };
  const handleSubmit = () => {
    if(!isloggedIn) navigate('/login')
    if (!jobTitle || !interviewType || !jobDescription) {
      alert("All fields are mandatory to be filled")
      return
    }
    navigate(`/${createSlug(jobTitle)}/interview`)
  }

  return (
    <div className="bg-white rounded-lg p-8 flex flex-col gap-6">

      <div>
        <p className="text-2xl md:text-3xl font-semibold">Job Description-Based Interview</p>
        <p className="text-gray-400 text-sm mt-1">Fill the details below to create your own custom interview practice</p>
      </div>

      <div className="border rounded-lg p-6 flex flex-col gap-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label>Job Title <span className="text-red-500">*</span></Label>
            <Input
              placeholder="Enter Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Interview Type <span className="text-red-500">*</span></Label>
            <select
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
              className="border border-gray-200 rounded-md px-3 py-2 text-sm w-full focus:outline-none"
            >
              <option value="">Enter Interview Type</option>
              <option value="Internship">Internship</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Add Job Description <span className="text-red-500">*</span></Label>
          <textarea
            placeholder="Enter Job Description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="border border-gray-200 rounded-md px-3 py-2 text-sm w-full h-48 resize-none focus:outline-none"
          />
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white px-8">
            SUBMIT
          </Button>
        </div>

      </div>
    </div>
  )
}
