import React, { useMemo } from 'react'
import { ArrowLeft } from 'lucide-react';
import { useLessonContext } from 'apps/web/context/useLessonContext';

const MAX_SCORE = 1000;
const MAX_LESSONS = 10;

const LessonProgress = () => {
  const { currentLessonIndex, totalScore } = useLessonContext()

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