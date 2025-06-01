import React from 'react'
import LessonProgress from './components/LessonProgress'
import { useLessonContext } from 'apps/web/context/useLessonContext'
import { get } from 'lodash-es'
import Record from './components/Record'
import Feedback from './components/Feedback'
import { ResultType } from 'packages/sui-earnlish-service'
import { Button } from "@radix-ui/themes";
import Congratulation from './components/Congratulation'
import { useRouter } from 'next/navigation'

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

  const router = useRouter()

  const handleNextLesson = async () => {
    lessonService.submitLessonScore({
      sentenceId: currentLesson.id.toString(),
      score: currentResult?.score || 0,
      address: currentAccount?.address || '',
    }).then(res => {
      setTotalScore(totalScore + (currentResult?.score || 0))
      if (currentLessonIndex === lessons.length - 1) {
        router.push('/leaderboard')
      }
      setCurrentLessonIndex(currentLessonIndex + 1)
      setCurrentResult({} as ResultType)
    })

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
      {currentLessonIndex === lessons.length - 1 ? (
        <Congratulation handleFinish={handleNextLesson} />
      ) : (
        <Button
          disabled={!get(currentResult, 'feedback', 0)}
          onClick={handleNextLesson}
        >
          Next Lesson
        </Button>
      )}


    </div>
  )
}


export default LessonScreen