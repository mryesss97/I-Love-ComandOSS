import { LessonService, ResultType, Sentence, VoiceRecorderService } from 'packages/sui-earnlish-service';
import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { get } from 'lodash-es';
import { useAccounts, useCurrentAccount } from '@mysten/dapp-kit';
import { getLocalStorage, StorageKeys } from '@suiEarnLish/utils';

type LessonContextType = {
  recordService: VoiceRecorderService;
  lessonService: LessonService;
  lessons: Sentence[];
  currentLessonIndex: number;
  totalScore: number;
  currentLesson: Sentence;
  setCurrentLessonIndex: (index: number) => void;
  setCurrentResult: (result: any) => void;
  currentResult: any;
  currentAccount: ReturnType<typeof useCurrentAccount>;
  setTotalScore: (score: number) => void;
};

const LessonContext = createContext<LessonContextType>({} as LessonContextType);

export const LessonProvider = ({ children }: { children: ReactNode }) => {
  const currentAccount = useCurrentAccount();

  const [recordService, setRecordService] = useState<VoiceRecorderService>({} as VoiceRecorderService);
  const [lessonService, setLessonService] = useState<LessonService>({} as LessonService);
  const [lessons, setLessons] = useState<Sentence[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [currentResult, setCurrentResult] = useState<ResultType>({} as ResultType);

  const currentLesson = useMemo(() => {
    return get(lessons, `[${currentLessonIndex}]`, {})
  }, [lessons, currentLessonIndex])

  useEffect(() => {
    initService()
  }, [])

  const initService = async () => {
    const signature = getLocalStorage(StorageKeys.SIGNATURE) as string;
    const service = new VoiceRecorderService(
      {
        signature,
        baseUrl: process.env.NEXT_PUBLIC_RECORD_SERVICE_URL
      }
    )
    const lesson = new LessonService({
      signature,
      baseUrl: process.env.NEXT_PUBLIC_LESSON_SERVICE_URL
    })
    setRecordService(service);
    setLessonService(lesson);
    const sentence = await service.getRandomSentence();
    setLessons(sentence);
  }

  return (
    <LessonContext.Provider value={{
      recordService: recordService as VoiceRecorderService,
      lessons,
      currentLessonIndex,
      totalScore,
      setCurrentLessonIndex,
      lessonService: lessonService as LessonService,
      currentLesson: currentLesson as Sentence,
      setCurrentResult,
      currentResult,
      currentAccount,
      setTotalScore
    }}
    >
      {children}
    </LessonContext.Provider>
  );
};

export const useLessonContext = () => useContext(LessonContext)