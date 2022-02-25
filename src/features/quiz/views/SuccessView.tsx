import React, { FC } from 'react';;
import { Modal } from 'ui-kit/Modal';
import { Button } from 'ui-kit/actions/Button';
import { CloseButton } from 'ui-kit/actions/CloseButton';
import { Text } from 'ui-kit/Text';

interface ISuccessViewProps {
  onClose: () => void;
  onDone: () => void;
}

export const SuccessView: FC<ISuccessViewProps> = (props: ISuccessViewProps) => {
  const { onClose, onDone } = props;

  return (
    <Modal.Content className='flex justify-center items-center'>
      <Modal.Header className='flex items-center justify-between'>
        <Text className='font-bold'>complete quiz</Text>
        <CloseButton onClick={onClose} />
      </Modal.Header>
      <Modal.Body>
        <Text>Quiz has been successfully submitted!</Text>
      </Modal.Body>
      <Modal.Footer className='flex items-center justify-between'>
        <Button onClick={onClose} color='red-500' selectionColor='red-600'><Text color='white'>Cancel</Text></Button>
        <Button onClick={onDone} color='green-500' selectionColor='green-600'><Text color='white'>Done</Text></Button>
        </Modal.Footer>
    </Modal.Content>
  )
}
