import {createContext, useContext, useState} from 'react';

const InterviewContext = createContext();

export const InterviewProvider = ({children})=>{
    const [selectedRole, setSelectedRole] = useState('')
    const [interviewCategory, setInterviewCategory] = useState('Role');
    const [difficultyLevel, setDifficultyLevel] = useState('');
    const [selectedRound, setSelectedRound] = useState('')
    const [jobTitle, setJobTitle] = useState('');
    const [interviewType, setInterviewType] = useState('');
    return (
      <InterviewContext.Provider value={{selectedRole, setSelectedRole, difficultyLevel, setDifficultyLevel, interviewCategory, setInterviewCategory, selectedRound, setSelectedRound,
        jobTitle, setJobTitle,interviewType, setInterviewType
      }}>
        {children}
      </InterviewContext.Provider>
    )
}

export const useInterview = ()=>useContext(InterviewContext)