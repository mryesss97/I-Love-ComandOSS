import React, { useState, useRef } from 'react'
import { Mic, CircleStop } from 'lucide-react'
import { useLessonContext } from 'apps/web/context/useLessonContext'

const AUTO_STOP_DURATION = 15 * 1000 // 30 seconds

const Record = () => {
  const { recordService, currentLesson, setCurrentResult } = useLessonContext()
  const [isStarted, setIsStarted] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleToggleRecording = () => {
    isStarted ? handleStop() : handleStart()
  }

  const handleStart = async () => {
    await recordService.start()
    setIsStarted(true)

    // Auto-stop after 30 seconds
    timeoutRef.current = setTimeout(() => {
      handleStop()
    }, AUTO_STOP_DURATION)
  }

  const handleStop = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    recordService.stop()
    setIsStarted(false)

    setTimeout(async () => {
      const res = await recordService?.upload(currentLesson.text)
      setCurrentResult(res)
    }, 800)
  }

  return (
    <div>
      <div onClick={handleToggleRecording}>
        {isStarted ? <CircleStop /> : <Mic className="text-gray-400" />}
      </div>
    </div>
  )
}

export default Record