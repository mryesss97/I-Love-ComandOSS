import { useLeaderBoardContext } from 'apps/web/context/useLeaderBoardContext';
import React from 'react'
import LeaderboardItem from './components/LeaderboardItem';
import { Button } from '@radix-ui/themes';
import { useRouter } from 'next/navigation'

const LeaderBoardScreen = () => {
  const { leaderboard } = useLeaderBoardContext();

  const router = useRouter()

  const backToLesson = () => {
    router.push('/lesson')
  };

  return (
    <div className='flex flex-col items-center h-screen bg-gray-100'>
      <h1 className='h3 bold mb-4'>Leader Board</h1>

      <div className='flex flex-col mt-4 items-center w-full max-w-2xl p-4 bg-white rounded-lg shadow-md mt-4'>
        {leaderboard.map(board => {
          return (
            <LeaderboardItem
              key={board.wallet}
              rank={board.rank}
              wallet={board.wallet}
              score={board.score}
            />
          )
        })}
      </div>

      <Button
        onClick={backToLesson}
        className='mt-4'
        variant='solid'>
        Back To Lesson
      </Button>

    </div>
  )
}

export default LeaderBoardScreen