import React, { FC } from 'react';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import isUndefined from 'lodash/isUndefined';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from 'ui-kit/Modal';
import { Text } from 'ui-kit/Text';
import { TextInput } from 'ui-kit/inputs/TextInput';
import { Button } from 'ui-kit/actions/Button';
import { CloseButton } from 'ui-kit/actions/CloseButton';
import { IFormData, schema, useFocusedInput, useInputColors, useSubmit } from './hooks';

const StyledInputGroup = styled.div`
  display: flex;
  flex-direction: column;
`

interface ISignInProps {
  modalId: string;
  onClose: () => void;
}

export const SignIn: FC<ISignInProps> = (props: ISignInProps) => {
  const { modalId, onClose } = props;

  const { register, handleSubmit, formState } = useForm<IFormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const { errors, touchedFields, isValid, isDirty } = formState;

  const { focusedInput , handleFocus } = useFocusedInput();

  const { colors } = useInputColors({ errors, touchedFields, focusedInput });

  const { mutation } = useSubmit();

  const submitHandler: SubmitHandler<IFormData> = (data) => mutation.mutate(data);

  return (
    <Modal.Content id={modalId}>
      <Modal.Header>modal header<CloseButton onClick={onClose} /></Modal.Header>
      <Modal.Body>
        <form autoComplete='off' onSubmit={handleSubmit(submitHandler)} onFocus={handleFocus}>
          <StyledInputGroup>
            <label htmlFor="email"><Text>Email</Text></label>
            <TextInput {...register('email')} color={colors.email} />
            {!isUndefined(errors.email) ? <Text color='red-500'>{errors.email?.message}</Text> : null}
          </StyledInputGroup>
          <StyledInputGroup>
            <label htmlFor="password"><Text>Password</Text></label>
            <TextInput {...register('password')} color={colors.password} />
            {!isUndefined(errors.password) ? <Text color='red-500'>{errors.password?.message}</Text> : null}
          </StyledInputGroup>
          <Button type="submit" isDisabled={!isDirty || !isValid} isLoading={mutation.isLoading}>click</Button>
        </form>
      </Modal.Body>
      <Modal.Footer>modal footer</Modal.Footer>
    </Modal.Content>
  )
}
