import {createContext, useContext, useState} from 'react';

const InterviewContext = createContext();

export const InterviewProvider = ({children})=>{
    const [selectedRole, setSelectedRole] = useState('')
    const [interviewCategory, setInterviewCategory] = useState('Role');
    const [difficultyLevel, setDifficultyLevel] = useState('easy');

    return (
      <InterviewContext.Provider value={{selectedRole, setSelectedRole, difficultyLevel, setDifficultyLevel, interviewCategory, setInterviewCategory}}>
        {children}
      </InterviewContext.Provider>
    )
}

export const useInterview = ()=>useContext(InterviewContext)