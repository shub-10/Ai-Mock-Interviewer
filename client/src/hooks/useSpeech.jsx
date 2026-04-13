
export const useSpeech = () => {
  const speak = (text) => {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1
    utterance.pitch = 1

    const voices = window.speechSynthesis.getVoices()
    const preferred = voices.find(v => v.lang === 'en-US')
    if (preferred) utterance.voice = preferred

    window.speechSynthesis.speak(utterance)
  }

  const stop = () => {
    window.speechSynthesis.cancel()
  }

  return { speak, stop }
}