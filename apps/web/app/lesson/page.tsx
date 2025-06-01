'use client'
import LessonScreen from 'apps/web/screens/LessonScreen';
import { LessonProvider } from 'apps/web/context/useLessonContext';

export default function Lesson() {
  return (
    <LessonProvider>
      <LessonScreen />
    </LessonProvider>

  )
}