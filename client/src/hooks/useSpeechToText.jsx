import { useState, useRef } from 'react'

export const useSpeechToText = () => {
  const [transcript, setTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef(null)

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert("Your browser doesn't support speech recognition")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onstart = () => setIsListening(true)

    recognition.onresult = (event) => {
      let fullTranscript = ''
      for (let i = 0; i < event.results.length; i++) {
        fullTranscript += event.results[i][0].transcript
      }
      setTranscript(fullTranscript)
    }

    recognition.onerror = (e) => {
      console.error('Speech error:', e.error)
      setIsListening(false)
    }

    recognition.onend = () => setIsListening(false)

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
  }
  const resetTranscript = () => setTranscript('')
  return { transcript, isListening, startListening, stopListening, resetTranscript  }
}