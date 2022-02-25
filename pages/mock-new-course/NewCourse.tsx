import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from 'src/store';
import { Button } from 'ui-kit/actions/Button';
import { MODAL } from 'src/constants';
import { useTheme } from 'styled-components'

export const NewCourse: FC = observer(() => {
  const { uiStore } = useRootStore();
  const theme = useTheme();
  console.log(theme);

  const handleOpenQuizModal = () => {
    uiStore.openModal(MODAL.QUIZ);
  }

  return (
    <div>
      mock new course page
      <div>
        <Button color='blue-500' selectionColor='blue-600' onClick={handleOpenQuizModal}>quiz</Button>
        <Button color='green-500' selectionColor='green-600'>analyses</Button>
        <Button color='yellow-500' selectionColor='yellow-600'>payment</Button>
      </div>
    </div>
  )
});

NewCourse.displayName = 'NewCourse';
