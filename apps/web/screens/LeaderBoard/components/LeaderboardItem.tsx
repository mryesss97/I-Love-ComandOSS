import { truncateAddress } from '@suiEarnLish/utils';
import { LeaderBoardItem } from 'packages/sui-earnlish-service';
import React from 'react'

const LeaderboardItem = (props: LeaderBoardItem) => {
  const { rank, wallet, score } = props;
  return (
    <div className='w-full max-w-2xl bg-white rounded-lg shadow-md mb-4'>
      <h2 className="text-sm text-gray-500 bold">Rank {rank}</h2>
      <h2 className="text-lg font-semibold">User: {truncateAddress(wallet)}</h2>

      <h2 className="font-semibold">Point {score} </h2>

    </div>
  )
}

export default LeaderboardItem