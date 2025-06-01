import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import React from 'react'
import { useLessonContext } from 'apps/web/context/useLessonContext'
import { get } from 'lodash-es'

interface CongratulationProps {
  handleFinish: () => void
}

const Congratulation = ({ handleFinish }: CongratulationProps) => {
  const { totalScore, currentResult } = useLessonContext()

  const handleGoToLeaderboard = () => {
    handleFinish()
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button disabled={!get(currentResult, 'feedback', "")} color="red">Finish</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>You Are Complete</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Congratulation you has finish lesson
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Action>
            <Button onClick={handleGoToLeaderboard} variant="solid" color="red">
              go to leaderboard
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default Congratulation