import { useLessonContext } from 'apps/web/context/useLessonContext'
import React from 'react'

const Feedback = () => {
  const { currentResult } = useLessonContext()

  const renderMistakes = () => {

  }
  return (
    <div>
      <div>{currentResult?.feedback}</div>
      <div>
        {currentResult.score} / 100
      </div>
      <div>
        {currentResult.transcribedText}
      </div>
    </div>
  )
}

export default Feedback