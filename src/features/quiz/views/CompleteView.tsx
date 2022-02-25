import React, { FC } from 'react';;
import { Modal } from 'ui-kit/Modal';
import { Button } from 'ui-kit/actions/Button';
import { CloseButton } from 'ui-kit/actions/CloseButton';
import { BackButton } from 'ui-kit/actions/BackButton';
import { Text } from 'ui-kit/Text';
import { IQuizData } from '../hooks';

interface ICompleteViewProps {
  quizData: IQuizData;
  onClose: () => void;
  onGoBack: () => void;
  onSubmit: () => void;
}

export const CompleteView: FC<ICompleteViewProps> = (props: ICompleteViewProps) => {
  const { quizData, onClose, onGoBack, onSubmit } = props;

  const { level, goal, consumption } = quizData;

  return (
    <Modal.Content className='flex justify-center items-center'>
      <Modal.Header className='flex items-center justify-between'>
        <BackButton onClick={onGoBack} />
        <Text className='font-bold'>complete quiz</Text>
        <CloseButton onClick={onClose} />
      </Modal.Header>
      <Modal.Body>
        <Text>Summary:</Text>
        <Text>Your level is:{level}</Text>
        <Text>Your goal is:{goal}</Text>
        <Text>Your consumption is:{consumption}</Text>
      </Modal.Body>
      <Modal.Footer className='flex items-center justify-between'>
        <Button onClick={onClose} color='red-500' selectionColor='red-600'><Text color='white'>Cancel</Text></Button>
        <Button onClick={onSubmit} color='green-500' selectionColor='green-600'><Text color='white'>Submit</Text></Button>
        </Modal.Footer>
    </Modal.Content>
  )
}
