import React from 'react'
import { Button } from '@/components/ui/button'
import { useInterview } from '../Context/interviewContext'


export const RoleBasedContent = () => {
  const { interviewCategory, setInterviewCategory, selectedRole, setSelectedRole } = useInterview();

  const roles = ["Software Engineer", "Full-Stack Developer", "Data Scientist", "Data Engineer", "Data Analyst", "Web Designer"]
  return (
    <div className="flex flex-col gap-10">
      <div className="text-center">
        <p className="text-3xl font-semibold md:text-5xl md:font-bold">{interviewCategory} - Specific</p>
        <p className="text-3xl font-semibold md:text-5xl md:font-bold text-blue-400"> AI Mock Interviews</p>

        <p className="text-gray-400 text-center">Practice {interviewCategory} specific interviews with real-world questions.
          <span className="hidden md:inline">
            <br />
            Improve domain knowledge, articulation and communication with instant feedback report.
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-2xl md:text-4xl font-semibold">Roles</p>
        <div className="grid grid-cols-1 md:grid-cols-3  gap-3">
          {
            roles.map((role) => {
              return (
                <Button key={role} onClick={() => setSelectedRole(role)} className="bg-white py-5 md:py-6 text-black border border-gray-200 shadow-lg cursor-pointer">{role}</Button>
              )
            })
          }
        </div>
      </div>
      {
        selectedRole && (
          <div className="absolute w-2/3 left-1/2 -translate-x-1/2 h-screen z-50 bg-white rounded-sm">
            <p className="text-gray-900 text-lg font-semibold">Interview Details</p>
            <Button className="bg-gray-400 text-lg font-semibold">{selectedRole}</Button>
            <div>
              <Button className="bg-blue-400 px-3 py-2 md:px-4">START PRACTICE</Button>
              <Button className="bg-white text-black hover:bg-gray-200">CANCEL</Button>
            </div>
          </div>

        )
      }

    </div>
  )
}
