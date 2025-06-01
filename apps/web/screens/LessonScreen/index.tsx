import React, { useEffect, useMemo } from 'react'
import LessonProgress from './components/LessonProgress'
import { useLessonContext } from 'apps/web/context/useLessonContext'
import { get } from 'lodash-es'
import Record from './components/Record'
import Feedback from './components/Feedback'
import { ResultType } from 'packages/sui-earnlish-service'

const LessonScreen = () => {
  const {
    currentLessonIndex,
    lessons,
    setCurrentLessonIndex,
    currentAccount,
    lessonService,
    currentResult,
    currentLesson,
    setTotalScore,
    totalScore,
    setCurrentResult
  } = useLessonContext()


  useEffect(() => {
    console.log("currentResult in LessonScreen:", currentResult)
  }, [currentResult])

  const handleNextLesson = async () => {
    lessonService.submitLessonScore({
      sentenceId: currentLesson.id.toString(),
      score: currentResult?.score || 0,
      address: currentAccount?.address || '',
    }).then(res => {
      setTotalScore(totalScore + (currentResult?.score || 0))

    })
    setCurrentLessonIndex(currentLessonIndex + 1)
    setCurrentResult({} as ResultType)

  }

  return (
    <div className='flex flex-col justify-between h-full'>
      <div>
        <LessonProgress />
        <div>
          <div>Read this sentence: </div>
          <p>
            {get(lessons, `[${currentLessonIndex}].text`, 'Loading...')}
          </p>
        </div>
        <Record />
        {!!get(currentResult, 'feedback', 0) && (
          <Feedback />
        )}
      </div>
      <button
        disabled={!get(currentResult, 'feedback', 0) || currentLessonIndex >= lessons.length - 1}
        onClick={handleNextLesson}
        className="bg-blue-500 text-white px-4 py-2 rounded 
             disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed"
      >
        Next Lesson
      </button>

    </div>
  )
}


export default LessonScreen