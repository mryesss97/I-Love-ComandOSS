import React, { useState } from 'react'
import { Mic, CircleStop } from 'lucide-react'
import { useLessonContext } from 'apps/web/context/useLessonContext'

const Record = () => {
  const { recordService, currentLesson, setCurrentResult } = useLessonContext()

  const [isStarted, setIsStarted] = useState(false)

  const handleToggleRecording = () => {
    isStarted ? handleStop() : handleStart()
  }

  const handleStart = async () => {
    await recordService.start()
    setIsStarted(true)
  }

  const handleStop = async () => {
    recordService.stop()
    setIsStarted(false)
    setTimeout(async () => {
      const res = await recordService?.upload(currentLesson.text)
      setCurrentResult(res)
    }, 800);
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