import React, { ChangeEvent, FC, useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'ui-kit/Modal';
import { Button } from 'ui-kit/actions/Button';
import { CloseButton } from 'ui-kit/actions/CloseButton';
import { BackButton } from 'ui-kit/actions/BackButton';
import { Text } from 'ui-kit/Text';
import { RadioInput } from 'ui-kit/inputs/RadioInput';
import { IConsumption, CONSUMPTION } from 'src/constants';
import { BookAdd as FitIcon } from '@styled-icons/fluentui-system-filled/BookAdd';
import { Book as MuscleIcon } from '@styled-icons/fluentui-system-filled/Book';

const StyledMuscleIcon = styled(MuscleIcon).attrs(() => ({
  className: 'w-full h-full',
}))``;

const StyledFitIcon = styled(FitIcon).attrs(() => ({
  className: 'w-full h-full',
}))``;

interface IConsumptionViewProps {
  value?: IConsumption;
  onClose: () => void;
  onGoBack: () => void;
  onGoNext: (consumption: IConsumption) => void;
}

export const ConsumptionView: FC<IConsumptionViewProps> = (props: IConsumptionViewProps) => {
  const { value: initialValue, onClose, onGoBack, onGoNext } = props;

  const [consumption, setConsumption] = useState<IConsumption | undefined>(initialValue);

  const handleSubmit = () => {
    if (!consumption) {
      return
    }

    onGoNext(consumption);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    if (value !== consumption) setConsumption(value as IConsumption);
  }

  return (
    <Modal.Content className='flex justify-center items-center'>
      <Modal.Header className='flex items-center justify-between'>
        <BackButton onClick={onGoBack} />
          <Text className='font-bold'>pick your consumption</Text>
        <CloseButton onClick={onClose} />
      </Modal.Header>
      <Modal.Body className='flex justify-evenly items-center'>
        <div className='flex mb-6'>
          <RadioInput name='consumption' value={CONSUMPTION.INJECTIONS} isActive={consumption === CONSUMPTION.INJECTIONS} onChange={handleChange} className='flex flex-col p-2 justify-center items-center cursor-pointer w-fit'>
            <RadioInput.Label className='mb-2'>
              <Text>INJECTIONS</Text>
            </RadioInput.Label>
            <RadioInput.Icon className='w-40 h-40 p-8 border-4 border-solid rounded-2xl'>
              <StyledMuscleIcon />
            </RadioInput.Icon>
          </RadioInput>
        </div>
        <div className='flex mb-6'>
          <RadioInput name='consumption' value={CONSUMPTION.PILLS} isActive={consumption === CONSUMPTION.PILLS} onChange={handleChange} className='flex flex-col p-2 justify-center items-center cursor-pointer w-fit'>
            <RadioInput.Label className='mb-2'>
              <Text>PILLS</Text>
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
