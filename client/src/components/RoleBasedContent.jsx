import React from 'react'
import { Button } from '@/components/ui/button'
import { useInterview } from '../Context/interviewContext'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from '@/components/ui/label'
import {useNavigate} from 'react-router-dom';


export const RoleBasedContent = () => {
  const { interviewCategory, selectedRole, setSelectedRole, selectedRound, setSelectedRound,difficultyLevel, setDifficultyLevel, } = useInterview()

  const navigate = useNavigate();
  const roles = ["Software Engineer", "Full-Stack Developer", "Data Scientist", "Data Engineer", "Data Analyst", "Web Designer"]
  const rounds = ["Non-technical", "Technical", "Behavioral"]

  const createSlug = (title) => {
    return title.toLowerCase().replace(/\s+/g, "-");
  };
  return (
    <div className="flex flex-col gap-10">
      <div className={selectedRole.length? "opacity-20": ""}>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {
            roles.map((role) => {
              return (
                <Button key={role} onClick={() => setSelectedRole(role)} className="bg-white py-5 md:py-6 text-black border border-gray-200 shadow-lg cursor-pointer">{role}</Button>
              )
            })
          }
        </div>
      </div>
      </div>
      {
        selectedRole && (
          <div className="absolute w-1/2 left-1/2 -translate-x-1/2 z-50 bg-white rounded-sm flex flex-col gap-2 px-3 py-1">
            <p className="text-gray-900 text-lg font-semibold">Interview Details</p>
            <div className="w-full bg-gray-400 text-white text-md md:text-lg font-semibold px-1 py-2 md:px-3 rounded-xl">{selectedRole}</div>
            <div className="flex flex-col gap-2">
              <Label>Interview Level <span className="text-red-500">*</span></Label>
              <select value={difficultyLevel} onChange={(e)=>setDifficultyLevel(e.target.value)}
                className="w-full rounded-md p-2 border border-gray-200">
                <option value="">Enter Interview Level </option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advance">Advance</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold flex flex-col">Select Round</p>
              <div className="flex flex-col md:flex-row gap-3">
                {
                  rounds.map((round)=>{
                    return (
                      <div key={round} className={round === selectedRound ?"bg-blue-400 text-white font-semibold px-2 py-1 md:px-3 md:py-2 border border-gray-200 rounded-md cursor-pointer":"px-2 py-1 md:px-3 md:py-2 border border-gray-200 rounded-md cursor-pointer"} onClick={()=>setSelectedRound(round)}>{round}</div>
                    )
                  })
                }
              </div>
            </div>
            <div className="flex gap-2">
              <Checkbox className="border-gray-400"></Checkbox>
              <Label>Audio</Label>
            </div>
            <div className="flex justify-end">
              <Button className="bg-blue-400 px-3 py-2 md:px-4 cursor-pointer" onClick={()=>navigate(`/${createSlug(selectedRole)}/interview`)}>START <span className="hidden md:inline">PRACTICE</span></Button>
              <Button className="bg-white text-black hover:bg-gray-200" onClick={()=>setSelectedRole('')}>CANCEL</Button>
            </div>
          </div>

        )
      }

    </div>
  )
}
