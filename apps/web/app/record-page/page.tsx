'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { LessonService, Sentence, VoiceRecorderService } from '@sui-earnlish-service'
import { ConnectButton, useCurrentAccount, useSignPersonalMessage } from '@mysten/dapp-kit';
import { AuthenticationService } from 'apps/web/services/authen';


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

  const handleStart = async () => {
    recorderRef.current = new VoiceRecorderService()
    await recorderRef.current.start()
    setRecording(true)
  }

  const handleStop = async () => {
    recorderRef.current?.stop()
    setRecording(false)

    setAudioUrl(recorderRef.current?.audioUrl || '')
    setTimeout(async () => {
      const sentence = originalText[currentSentenceIndex]
      const res = await recorderRef.current?.upload(sentence.text)
      // const submit = await submitAnswer(res.score, sentence?.id)
      setResult(res)
    }, 1000);
  }

  const handleSignMessage = async () => {
    const service = new AuthenticationService()
    const message = process.env.NEXT_PUBLIC_MESSAGE
    signPersonalMessage(
      {
        message: new TextEncoder().encode(message),
      },
      {
        onSuccess: (result) => {
          setSignature(result.signature)
          console.log("result signature", { result, address: currentAccount?.address })

          service.verifyUser({
            address: currentAccount?.address || '',
            signature: result.signature,
          }).then((res) => {
            console.log("verify user res", res)
          }).catch((err) => {
            console.error("verify user error", err)
          })

        },
      },
    );
  }

  const submitAnswer = async (score: number, sentenceId: number) => {
    const service = new LessonService()
    const response = await service.submitLessonScore({
      sentenceId: sentenceId.toString(),
      score,
      address: currentAccount?.address || '',
    })
    console.log("response ***", response)
  }

  const handleGetScoreByUser = async () => {
    const service = new LessonService()
    if (!currentAccount?.address) {
      console.error("No current account address found")
      return
    }
    const score = await service.getLessonScoreByUser(currentAccount.address)
    console.log("User score:", score)
    return score
  }

  const handleGetLeaderboard = async () => {
    const service = new LessonService()
    const leaderboard = await service.getLeaderboard(currentAccount?.address)
  }
  return (
    <div className="p-4 space-y-4">
      <ConnectButton className="mb-4" />
      {currentAccount && (
        <div>
          <p className="text-gray-700">Connected Account: {currentAccount.address}</p>
          <button onClick={handleSignMessage}>Sign Message</button>
        </div>
      )}
      <p className="text-gray-700">Original Sentence: {renderSentence}</p>
      <div>
        <h1 className="text-2xl font-bold">Voice Recorder</h1>
        <button onClick={recording ? handleStop : handleStart} className="px-4 py-2 bg-blue-500 text-white rounded">
          {recording ? '⏹ Stop' : '🎙 Start Recording'}
        </button>
      </div>
      <div className='mb-4'>
        <button onClick={handleGetScoreByUser}>
          <span >Get Score by User</span>
        </button>
      </div>

      <div className='mb-4'>
        <button onClick={handleGetLeaderboard}>
          <span >Get Leader Board</span>
        </button>
      </div>

      {audioUrl && <audio controls src={audioUrl} className="w-full" />}

      {result && (
        <div className="bg-gray-100 p-2 rounded">
          <p><strong>Transcript:</strong> {result.transcribedText}</p>
          <p><strong>Score:</strong> {result.score}</p>

          <p><strong>Feedback:</strong> {result.feedback}</p>
        </div>
      )}
    </div>
  )
}