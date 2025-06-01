import React, { useMemo } from 'react'
import { ArrowLeft } from 'lucide-react';
import { useLessonContext } from 'apps/web/context/useLessonContext';
import { useRouter } from 'next/navigation'


const LessonProgress = () => {
  const { currentLessonIndex, totalScore, MAX_LESSONS, MAX_SCORE } = useLessonContext()
  const router = useRouter()

  const backToHome = () => {
    router.push('/')
  };

  return (
    <div className="grid grid-rows-3 grid-flow-col gap-2">
      <div onClick={backToHome}>
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