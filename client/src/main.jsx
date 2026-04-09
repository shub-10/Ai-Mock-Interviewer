import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {App} from './App.jsx'
import {AuthProvider} from './Context/authContext'
import {InterviewProvider} from './Context/interviewContext'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <InterviewProvider>
      <App />
      </InterviewProvider>
    </AuthProvider>
  </BrowserRouter>,
)
