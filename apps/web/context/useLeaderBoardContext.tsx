import React, { createContext, useContext, ReactNode, useEffect, useState, } from 'react';
import { get } from 'lodash-es';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { getLocalStorage, StorageKeys } from '@suiEarnLish/utils';
import { currentUserEntry, LeaderboardEntry, LeaderBoardItem, LessonService } from '@sui-earnlish-service';

const MAX_LESSONS = 1
const MAX_SCORE = MAX_LESSONS * 100;

type LeaderBoardContextType = {
  MAX_SCORE: number;
  lessonService: LessonService;
  leaderboard: LeaderBoardItem[];
  currentUserRank: currentUserEntry;
};

const LeaderBoardContext = createContext<LeaderBoardContextType>({} as LeaderBoardContextType);

export const LeaderBoardProvider = ({ children }: { children: ReactNode }) => {
  const currentAccount = useCurrentAccount();
  const [lessonService, setLessonService] = useState<LessonService>()
  const [leaderboard, setLeaderboard] = useState<LeaderBoardItem[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState<currentUserEntry>();

  useEffect(() => {
    initData();
  }, [])

  const initData = async () => {
    const signature = getLocalStorage(StorageKeys.SIGNATURE) as string;
    const lesson = new LessonService({
      signature,
      baseUrl: process.env.NEXT_PUBLIC_LESSON_SERVICE_URL
    })
    const leaderBoardData = await lesson.getLeaderboard(currentAccount?.address);
    setLeaderboard(get(leaderBoardData, 'leaderboard', []));
    setCurrentUserRank(get(leaderBoardData, 'currentUser'));
    setLessonService(lesson)
  }

  return (
    <LeaderBoardContext.Provider value={{
      MAX_SCORE,
      lessonService: lessonService as LessonService,
      leaderboard,
      currentUserRank: currentUserRank as currentUserEntry
    }}
    >
      {children}
    </LeaderBoardContext.Provider>
  );
};

export const useLeaderBoardContext = () => useContext(LeaderBoardContext)