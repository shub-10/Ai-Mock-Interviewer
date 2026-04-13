import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useInterview } from '../Context/interviewContext'

const roles = ['Frontend', 'Backend', 'System Design', 'Data Science', 'DevOps']

export const Home = () => {
  const navigate = useNavigate()
  const { setSelectedRole } = useInterview()

  useEffect(() => {
    setSelectedRole('')
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center overflow-hidden">

      <div className="absolute inset-0 [background-image:linear-gradient(var(--tw-border-opacity,#e5e7eb)_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)] pointer-events-none" />

      <div className="relative flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-background text-sm font-medium text-emerald-600 mb-8">
        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
        AI-Powered Interview Coach
      </div>

      <h1 className="relative text-4xl md:text-6xl font-medium leading-tight max-w-3xl mb-5">
        Practice real tech interviews.<br />
        <span className="text-emerald-600">Land your dream job.</span>
      </h1>

      <p className="relative text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed mb-10">
        Get instant feedback from AI on your answers, communication, and problem-solving — just like the real thing.
      </p>

      <div className="relative flex gap-3 flex-wrap justify-center mb-8">
        <button
          onClick={() => navigate('/job-interviews')}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-85 transition-opacity"
        >
          Start practicing
          <span>&rarr;</span>
        </button>

      </div>

      <div className="relative flex flex-wrap gap-2 justify-center mb-12">
        {roles.map(role => (
          <span key={role} className="px-4 py-1.5 rounded-full border border-border bg-muted text-muted-foreground text-xs">
            {role}
          </span>
        ))}
      </div>

      <div className="relative flex gap-3 flex-wrap justify-center mt-10">
        {[
          { icon: '⚡', label: 'Instant AI feedback' },
          { icon: '🎯', label: 'Role-specific questions' },
          { icon: '📄', label: 'Detailed interview report' },
          { icon: '🔁', label: 'Practice as many times as you want' },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background text-sm text-muted-foreground"
          >
            <span style={{ fontSize: '14px' }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}