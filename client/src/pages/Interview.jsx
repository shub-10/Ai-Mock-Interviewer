import React from 'react'
import { Button } from '@/components/ui/button'
import {useInterview} from '../Context/interviewContext'

import {RoleBasedContent} from '../components/RoleBasedContent'
import {JdbasedContent} from '../components/JdbasedContent'
export const Interview = () => {
  const {interviewCategory, setInterviewCategory, selectedRole, setSelectedRole} = useInterview();
  const tabs = [
    { id: 'Role', desc: "Role Based" }, { id: 'JD', desc: "JD Based" }
  ]

 
  return (
    <div className="relative min-h-screen p-5 flex flex-col gap-10 bg-gray-100" >
      <div className="w-2/3 md:w-1/3 mx-auto flex px-2 py-2 md:px-5 md:py-3 justify-center items-center gap-4 ">
        {
          tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setInterviewCategory(tab.id)}
              className={
                tab.id == interviewCategory ? "bg-blue-400 cursor-pointer " : " bg-white text-black cursor-pointer "
              }>
              {tab.desc}
            </Button>
          ))
        }
      </div>

     {
      interviewCategory === "Role" && <RoleBasedContent/>
     }
     {
      interviewCategory === "JD" && <JdbasedContent/>
     }

    </div>
  )
}
