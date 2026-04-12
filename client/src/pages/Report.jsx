import React from 'react'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'


export const Report = () => {
  const token = localStorage.getItem('Aitoken')
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL

  useEffect(() => {
    const getReports = async () => {
      try {
        const res = await fetch(`${serverBaseUrl}/api/v2/interview/reports`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        const repo = await res.json()
        setReports(repo.Reports)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    getReports()
  }, [])

  

  const getBadgeColor = (category) => {
    return category === 'Role' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  )

  if (reports.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-gray-400">
      <p className="text-4xl">📋</p>
      <p className="text-lg font-medium">No reports yet</p>
      <p className="text-sm">Complete an interview to see your report here</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      <div className="text-center mb-10">
        <p className="text-2xl md:text-3xl font-bold text-blue-500">YOUR INTERVIEW REPORTS</p>
        <p className="text-gray-400 text-sm mt-1">Analyze your performance and do better</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report._id} className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4 p-5">

            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getBadgeColor(report.category)}`}>
                {report.category === 'Role' ? 'Role Based' : 'JD Based'}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(report.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {report.selectedRole && (
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">{report.selectedRole}</span>
              )}
              {report.selectedRound && (
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">{report.selectedRound}</span>
              )}
              {report.difficultyLevel && (
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">{report.difficultyLevel}</span>
              )}
              {report.jobTitle && (
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">{report.jobTitle}</span>
              )}
            </div>

            <hr className="border-gray-100" />

           <div className="text-sm text-gray-600">
            <ReactMarkdown >{report.report}</ReactMarkdown>
           </div>

          </div>
        ))}
      </div>
    </div>
  )
}