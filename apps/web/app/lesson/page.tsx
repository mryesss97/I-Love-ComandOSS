'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { LessonService, Sentence, VoiceRecorderService } from '@sui-earnlish-service'
import { ConnectButton, useCurrentAccount, useSignPersonalMessage } from '@mysten/dapp-kit';
import { AuthenticationService } from 'apps/web/services/authen';
import LessonScreen from 'apps/web/screens/LessonScreen';
import { LessonProvider } from 'apps/web/context/useLessonContext';


export default function Recorder() {
  const recorderRef = useRef<VoiceRecorderService | null>(null)
  const [recording, setRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState('')
  const [originalText, setOriginalText] = useState<Sentence[]>([])
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(Math.floor(Math.random() * 11))
  const [signature, setSignature] = useState<string | null>(null)
  const currentAccount = useCurrentAccount();
  const { mutate: signPersonalMessage } = useSignPersonalMessage();

  const [result, setResult] = useState<any>(null)

  const renderSentence = useMemo(() => {
    return originalText.length > 0 ? originalText[currentSentenceIndex]?.text : 'Loading...'
  }, [originalText, originalText])

  useEffect(() => {
    initService()
  }, [])

  const initService = async () => {
    if (!recorderRef.current) {
      recorderRef.current = new VoiceRecorderService()
      const sentence = await recorderRef.current.getRandomSentence();
      setOriginalText(sentence);
    }
  }






  return (
    <LessonProvider>
      <LessonScreen />
    </LessonProvider>

  )
}