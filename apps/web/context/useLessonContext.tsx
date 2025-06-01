import { LessonService, ResultType, Sentence, VoiceRecorderService } from '@sui-earnlish-service';
import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { get } from 'lodash-es';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { getLocalStorage, getSignature, StorageKeys } from '@suiEarnLish/utils';

const MAX_LESSONS = 1
const MAX_SCORE = MAX_LESSONS * 100;

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
  MAX_LESSONS: number;
  MAX_SCORE: number;
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
    const signature = getLocalStorage(StorageKeys.SIGNATURE) as string
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
    const response = await service.getRandomSentence();
    const sentence = await getRandomLesson(response);
    setLessons(sentence);
  }

  const getRandomLesson = async (less: Sentence[]): Promise<Sentence[]> => {
    const shuffled = [...less].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, MAX_LESSONS);
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
      setTotalScore,
      MAX_LESSONS,
      MAX_SCORE
    }}
    >
      {children}
    </LessonContext.Provider>
  );
};

export const useLessonContext = () => useContext(LessonContext)