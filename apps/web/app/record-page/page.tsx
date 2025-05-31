'use client'

import { useRef, useState } from 'react'
import { VoiceRecorderService } from '@sui-earnlish-service'

export default function Recorder() {
  const recorderRef = useRef<VoiceRecorderService | null>(null)
  const [recording, setRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState('')
  const [result, setResult] = useState<any>(null)

  const handleStart = async () => {
    recorderRef.current = new VoiceRecorderService()
    await recorderRef.current.start()
    setRecording(true)
  }

  const handleStop = async () => {
    recorderRef.current?.stop()
    setRecording(false)

    setAudioUrl(recorderRef.current?.audioUrl || '')
    setTimeout(async () => {
      const res = await recorderRef.current?.upload("hello world")
      setResult(res)
    }, 1000);
  }

  return (
    <div className="p-4 space-y-4">
      <button onClick={recording ? handleStop : handleStart} className="px-4 py-2 bg-blue-500 text-white rounded">
        {recording ? '⏹ Stop' : '🎙 Start Recording'}
      </button>

      {audioUrl && <audio controls src={audioUrl} className="w-full" />}

      {result && (
        <div className="bg-gray-100 p-2 rounded">
          <p><strong>Transcript:</strong> {result.transcript}</p>
          <p><strong>Feedback:</strong> {result.feedback}</p>
        </div>
      )}
    </div>
  )
}