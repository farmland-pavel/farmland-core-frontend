import React, { ChangeEvent, FC, useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'ui-kit/Modal';
import { Button } from 'ui-kit/actions/Button';
import { CloseButton } from 'ui-kit/actions/CloseButton';
import { Text } from 'ui-kit/Text';
import { RadioInput } from 'ui-kit/inputs/RadioInput';
import { ICourseLevel, COURSE_LEVEL} from 'src/constants';
import { BookAdd as FitIcon } from '@styled-icons/fluentui-system-filled/BookAdd';
import { Book as MuscleIcon } from '@styled-icons/fluentui-system-filled/Book';

const StyledMuscleIcon = styled(MuscleIcon).attrs(() => ({
  className: 'w-full h-full',
}))``;

const StyledFitIcon = styled(FitIcon).attrs(() => ({
  className: 'w-full h-full',
}))``;

interface ILevelViewProps {
  value?: ICourseLevel;
  onClose: () => void;
  onGoNext: (level: ICourseLevel) => void;
}

export const LevelView: FC<ILevelViewProps> = (props: ILevelViewProps) => {
  const { value: initialValue, onClose, onGoNext } = props;

  const [level, setLevel] = useState<ICourseLevel | undefined>(initialValue);

  const handleSubmit = () => {
    if (!level) {
      return;
    }

    onGoNext(level);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    if (value !== level) setLevel(value as ICourseLevel);
  }

  return (
    <Modal.Content className='flex justify-center items-center'>
      <Modal.Header className='flex items-center justify-between'>
        <Text className='font-bold'>pick your level</Text>
        <CloseButton onClick={onClose} />
      </Modal.Header>
      <Modal.Body className='flex justify-evenly items-center'>
        <div className='flex mb-6'>
          <RadioInput name='level' value={COURSE_LEVEL.BEGINNER} isActive={level === COURSE_LEVEL.BEGINNER} onChange={handleChange} className='flex flex-col p-2 justify-center items-center cursor-pointer w-fit'>
            <RadioInput.Label className='mb-2'>
              <Text>BEGINNER</Text>
            </RadioInput.Label>
            <RadioInput.Icon className='w-40 h-40 p-8 border-4 border-solid rounded-2xl'>
              <StyledMuscleIcon />
            </RadioInput.Icon>
          </RadioInput>
        </div>
        <div className='flex mb-6'>
          <RadioInput name='level' value={COURSE_LEVEL.ADVANCED} isActive={level === COURSE_LEVEL.ADVANCED} onChange={handleChange} className='flex flex-col p-2 justify-center items-center cursor-pointer w-fit'>
            <RadioInput.Label className='mb-2'>
              <Text>ADVANCED</Text>
            </RadioInput.Label>
            <RadioInput.Icon className='w-40 h-40 p-8 border-4 border-solid rounded-2xl'>
              <StyledFitIcon />
            </RadioInput.Icon>
          </RadioInput>
        </div>
      </Modal.Body>
      <Modal.Footer className='flex items-center justify-between'>
        <Button onClick={onClose} color='red-500' selectionColor='red-600'><Text color='white'>Cancel</Text></Button>
        <Button onClick={handleSubmit} color='green-500' selectionColor='green-600'><Text color='white'>Continue</Text></Button>
      </Modal.Footer>
    </Modal.Content>
  )
}
