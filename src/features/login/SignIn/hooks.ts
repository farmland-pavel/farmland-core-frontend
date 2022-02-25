import { useState, FocusEvent } from 'react';
import { FieldErrors, FieldNamesMarkedBoolean } from 'react-hook-form';
import * as yup from "yup";
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import { useMutation } from 'react-query';
import { IColor } from 'ui-kit/entities';
import { useApi } from 'src/context/ApiContext';
import { useRootStore } from 'src/store';

export interface IFormData {
  email: string;
  password: string;
}

const fields: (keyof IFormData)[] = ['email', 'password'];
const requiredFields: (keyof IFormData)[] = ['email', 'password'];

export const schema = yup.object().shape({
  email: yup.string().trim().required('Email is required').typeError('Email contains invalid characters'),
  password: yup.string().trim().required('Password is required').typeError('Password contains invalid characters'),
}).required('Please fill in required fields');

export const useFocusedInput = () => {
  const [currentFocusedInput, setFocusedInput] = useState<keyof IFormData | undefined>();

  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    const nextFocusedInput = get(event, 'target.name');

    if (nextFocusedInput !== currentFocusedInput && fields.includes(nextFocusedInput) || isUndefined(nextFocusedInput)) {
      setFocusedInput(nextFocusedInput);
    }
  }

  return { focusedInput: currentFocusedInput, handleFocus };
}

interface IUseInputColorsProps {
  errors: FieldErrors<IFormData>;
  touchedFields: FieldNamesMarkedBoolean<IFormData>;
  focusedInput?: keyof IFormData;
}

type IInputColors = {
  [key in keyof IFormData]?: IColor;
}

export const useInputColors = ({ errors, touchedFields , focusedInput}: IUseInputColorsProps) => {
  const colors = fields.reduce((result: IInputColors, field) => {
    if (field === focusedInput) {
      result[field] = 'blue-500';
      return result;
    }
  
    if (field in errors) {
      result[field] = 'red-500';
      return result;
    }

    if (!(field in touchedFields)) {
      result[field] = requiredFields.includes(field) ? 'yellow-500' : 'gray-500';
      return result;
    }

    result[field] = 'green-500';
    return result;
  }, {})

  return { colors };
}

export const useSubmit = () => {
  const { authStore } = useRootStore();
  const { authApi } = useApi();

  const mutation = useMutation((data: IFormData) => authApi.signIn(data), {
    onSuccess: (response) => authStore.login(response.data.accessToken),
    onError: (error) => console.log(error)
  });

  return { mutation };
}
