import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import { useMutation, useQuery } from 'react-query';
import { useRootStore } from 'src/store';
import { useApi } from 'src/context/ApiContext';
import { ICourseLevel, ICourseGoal, IConsumption } from 'src/constants';
import { useEffect } from "react";

type IQuizState = 'LEVEL' | 'GOAL' | 'CONSUMPTION' | 'COMPLETE' | 'SUCCESS';

export const QUIZ_STATE: Record<IQuizState, IQuizState> = {
  LEVEL: 'LEVEL',
  GOAL: 'GOAL',
  CONSUMPTION: 'CONSUMPTION',
  COMPLETE: 'COMPLETE',
  SUCCESS: 'SUCCESS',
}

const QUIZ_ACTION: Record<string, string> = {
  NEXT: 'next',
  BACK: 'back',
}

export interface IQuizContext {
  level?: ICourseLevel;
  goal?: ICourseGoal;
  consumption?: IConsumption;
}

const quizMachine = createMachine<IQuizContext>({
  id: "quiz",
  initial: QUIZ_STATE.LEVEL,
  context: {},
  states: {
    [QUIZ_STATE.LEVEL]: {
      on: {
        [QUIZ_ACTION.NEXT]: { target: QUIZ_STATE.GOAL },
      }
    },
    [QUIZ_STATE.GOAL]: {
      on: {
        [QUIZ_ACTION.NEXT]: { target: QUIZ_STATE.CONSUMPTION },
        [QUIZ_ACTION.BACK]: { target: QUIZ_STATE.LEVEL },
      }
    },
    [QUIZ_STATE.CONSUMPTION]: {
      on: {
        [QUIZ_ACTION.NEXT]: { target: QUIZ_STATE.COMPLETE },
        [QUIZ_ACTION.BACK]: { target: QUIZ_STATE.GOAL },
      }
    },
    [QUIZ_STATE.COMPLETE]: {
      on: {
        [QUIZ_ACTION.NEXT]: { target: QUIZ_STATE.SUCCESS },
        [QUIZ_ACTION.BACK]: { target: QUIZ_STATE.CONSUMPTION },
      }
    },
    [QUIZ_STATE.SUCCESS]: {
      type: 'final'
    },
  }
});

export const useQuizSM = () => {
  const [current, send] = useMachine(quizMachine);

  const handleGoBack = () => {
    send(QUIZ_ACTION.BACK);
  }

  const handleGoNext = (data: IQuizContext = {}) => {
    send(QUIZ_ACTION.NEXT, { data });
  }

  return { quizSM: current, dispatchQuizSM: send, handleGoBack, handleGoNext };
}

export type IQuizData = Required<IQuizContext>;

export const useSubmit = () => {
  const { uiStore } = useRootStore();
  const { quizApi } = useApi();

  const mutation = useMutation((data: IQuizData) => quizApi.create(data), {
    onSuccess: () => console.log('show success alert'),
    onError: (error) => console.log(error)
  });

  return { mutation };
}

// test only
export const useTest = () => {
  const { quizApi, courseApi} = useApi();

  const query1 = useQuery('quizzes', () => quizApi.get(), {
    enabled: false,
    onSuccess: () => console.log('show success alert'),
    onError: (error) => console.log(error)
  });

  useEffect(() => {
    query1.refetch();
  }, [])

  const query2 = useQuery('courses', () => courseApi.get(), {
    enabled: false,
    onSuccess: () => console.log('show success alert'),
    onError: (error) => console.log(error)
  });

  useEffect(() => {
    query2.refetch();
  }, [])
}
