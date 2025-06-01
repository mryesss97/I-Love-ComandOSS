'use client';
import { ConnectButton, useCurrentAccount, useSignPersonalMessage } from '@mysten/dapp-kit';
import { useEffect, useState } from 'react';
import { AuthenticationService } from '../services/authen';
import { useRouter } from 'next/navigation'
import { getSignature, saveSignature, setLocalStorage, StorageKeys } from '@suiEarnLish/utils';
import { Button } from '@radix-ui/themes';
import { usePrevious } from '../hooks/usePrevious';

export default function Home() {
  const router = useRouter()
  const { mutate: signPersonalMessage } = useSignPersonalMessage();
  const currentAccount = useCurrentAccount();

  const [isLoading, setIsLoading] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (currentAccount?.address) {
      setTimeout(() => {
        handleSignin()
      }, 100);
    }
  }, [currentAccount])


  const handleSignin = async () => {
    setIsLoading(true)
    const service = new AuthenticationService()
    const message = process.env.NEXT_PUBLIC_MESSAGE
    signPersonalMessage(
      {
        message: new TextEncoder().encode(message),
      },
      {
        onSuccess: (result) => {
          setLocalStorage(StorageKeys.SIGNATURE, result.signature)
          service.verifyUser({
            address: currentAccount?.address || '',
            signature: result.signature,
          }).then((res) => {
            setIsReady(true)
          }).catch((err) => {
            console.error("verify user error", err)
            setIsLoading(false)
          })
        },
      },
    );
  }

  const goToLesson = () => {
    router.push('/lesson')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-red-100">
      <h1>Welcome to suiEarnLish</h1>
      <p className='text-gray-500'>Learn English with Sui</p>
      {!isReady && (
        <p className='text-gray-500'>Please sign in to start learning</p>

      )}
      <ConnectButton connectText="Signin" />
      {isReady && (
        <Button className='mt-2' onClick={goToLesson} >
          Start Learning
        </Button>
      )}


    </div>

  )
}