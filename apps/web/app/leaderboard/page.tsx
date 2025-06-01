'use client'
import { LeaderBoardProvider } from 'apps/web/context/useLeaderBoardContext';
import LeaderBoardScreen from 'apps/web/screens/LeaderBoard';

export default function LeaderBoard() {
  return (
    <LeaderBoardProvider>
      <LeaderBoardScreen />
    </LeaderBoardProvider>
  )
}