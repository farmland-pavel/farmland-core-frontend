import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Modal } from 'ui-kit/Modal';
import isUndefined from 'lodash/isUndefined';
import { useRootStore } from 'src/store';
import { ICourseLevel, ICourseGoal, IConsumption, MODAL } from 'src/constants';
import { LevelView, GoalView, ConsumptionView, CompleteView, SuccessView } from './views';

import { useQuizSM, useSubmit, QUIZ_STATE, IQuizContext , useTest } from './hooks';

const getQuizDataIfReady = ({ level, goal, consumption }: IQuizContext) => {
  return !!level && !!goal && !!consumption ? { level, goal, consumption } : undefined;
}

export const QuizModal: FC = observer(() => {
  const { uiStore } = useRootStore();

  useTest();

  const { quizSM, handleGoBack, handleGoNext } = useQuizSM();

  const { mutation } = useSubmit();

  const isOpen = uiStore.isModalOpen(MODAL.QUIZ);

  const { level, goal, consumption } = quizSM.context;

  const quizData = getQuizDataIfReady({ level, goal, consumption });

  const handleCloseModal = () => {
    uiStore.closeModal(MODAL.QUIZ);
  }

  const handleLevelGoNext = (level: ICourseLevel) => handleGoNext({ level });
  const handleGoalGoNext = (goal: ICourseGoal) => handleGoNext({ goal });
  const handleConsumptionGoNext = (consumption: IConsumption) => handleGoNext({ consumption });

  const handleSubmit = async () => {
    if (!isUndefined(quizData)) {
      await mutation.mutateAsync(quizData);
      handleGoNext();
    }
  }

  const handleDone = () => {
    uiStore.closeModal(MODAL.QUIZ);
  }

  return (
    <Modal isOpen={isOpen}>
      <Modal.Overlay onClick={handleCloseModal} />
      {quizSM.matches(QUIZ_STATE.LEVEL) ? <LevelView onClose={handleCloseModal} value={level} onGoNext={handleLevelGoNext} /> : null}
      {quizSM.matches(QUIZ_STATE.GOAL) ? <GoalView onClose={handleCloseModal} onGoBack={handleGoBack} value={goal} onGoNext={handleGoalGoNext} /> : null}
      {quizSM.matches(QUIZ_STATE.CONSUMPTION) ? <ConsumptionView onClose={handleCloseModal} onGoBack={handleGoBack} value={consumption} onGoNext={handleConsumptionGoNext} /> : null}
      {quizSM.matches(QUIZ_STATE.COMPLETE) && !!quizData ? <CompleteView onClose={handleCloseModal} onGoBack={handleGoBack} quizData={quizData} onSubmit={handleSubmit} /> : null}
      {quizSM.matches(QUIZ_STATE.SUCCESS) ? <SuccessView onClose={handleCloseModal} onDone={handleDone} /> : null}
    </Modal>
  )
});

QuizModal.displayName = 'QuizModal';
