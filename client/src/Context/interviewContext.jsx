import { createContext, useContext, useState } from 'react';

const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [selectedRole, setSelectedRole] = useState(() => sessionStorage.getItem('selectedRole') || '')
  const [selectedRound, setSelectedRound] = useState(() => sessionStorage.getItem('selectedRound') || '')
  const [difficultyLevel, setDifficultyLevel] = useState(() => sessionStorage.getItem('difficultyLevel') || '')
  const [interviewCategory, setInterviewCategory] = useState(() => sessionStorage.getItem('interviewCategory') || 'Role')
  const [jobTitle, setJobTitle] = useState(() => sessionStorage.getItem('jobTitle') || '')
  const [interviewType, setInterviewType] = useState(() => sessionStorage.getItem('interviewType') || '')
  const [jobDescription, setJobDescription] = useState(() => sessionStorage.getItem('jobDescription') || '')

  const updateSelectedRole = (role) => {
    sessionStorage.setItem('selectedRole', role)
    setSelectedRole(role)
  }
  const updateSelectedRound = (round) => {
    sessionStorage.setItem('selectedRound', round)
    setSelectedRound(round)
  }
  const updateDifficultyLevel = (level) => {
    sessionStorage.setItem('difficultyLevel', level)
    setDifficultyLevel(level)
  }
  const updateInterviewCategory = (category) => {
    sessionStorage.setItem('interviewCategory', category)
    setInterviewCategory(category)
  }
  const updateJobTitle = (title) => {
    sessionStorage.setItem('jobTitle', title)
    setJobTitle(title)
  }
  const updateInterviewType = (type) => {
    sessionStorage.setItem('interviewType', type)
    setInterviewType(type)
  }
  const updateJobDescription = (desc) => {
    sessionStorage.setItem('jobDescription', desc)
    setJobDescription(desc)
  }

  return (
    <InterviewContext.Provider value={{
      selectedRole, setSelectedRole: updateSelectedRole,
      selectedRound, setSelectedRound: updateSelectedRound,
      difficultyLevel, setDifficultyLevel: updateDifficultyLevel,
      interviewCategory, setInterviewCategory: updateInterviewCategory,
      jobTitle, setJobTitle: updateJobTitle,
      interviewType, setInterviewType: updateInterviewType,
      jobDescription,setJobDescription: updateJobDescription,
    }}>
      {children}
    </InterviewContext.Provider>
  )
}

export const useInterview = () => useContext(InterviewContext)