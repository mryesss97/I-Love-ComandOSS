import React, { useMemo } from 'react'
import { ArrowLeft } from 'lucide-react';
import { useLessonContext } from 'apps/web/context/useLessonContext';


const LessonProgress = () => {
  const { currentLessonIndex, totalScore, MAX_LESSONS, MAX_SCORE } = useLessonContext()

  return (
    <div className="grid grid-rows-3 grid-flow-col gap-2">
      <div>
        <ArrowLeft />
      </div>
      <div >
        {currentLessonIndex + 1} / {MAX_LESSONS}
      </div>
      <div >{totalScore} / {MAX_SCORE}</div>
    </div>
  )
}

export default LessonProgress