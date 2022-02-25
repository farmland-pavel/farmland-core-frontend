import React, { FC, ChangeEvent, forwardRef, ForwardedRef } from 'react';
import styled from 'styled-components';

import { ITheme, IColor } from '../../entities';
import { useTheme } from '../../context';

interface IStyledTextInputProps {
  theme: ITheme;
  color: IColor;
}

const StyledTextInput = styled.input<IStyledTextInputProps>`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${(props: IStyledTextInputProps) => {
    const { theme, color } = props;
    const { global: { colors } } = theme;

    return colors[color];
  }};

  &:focus {
    outline: none;
    box-shadow: ${(props: IStyledTextInputProps) => {
      const { theme, color } = props;
      const { global: { colors } } = theme;

      return '0 0 0 0 2px ' + colors[color];
    }};
    /* box-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color); */
  }
`;

interface ITextInputProps {
  value?: string;
  color?: IColor;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: FC<ITextInputProps> = forwardRef<HTMLInputElement, ITextInputProps>((props: ITextInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { color = 'gray-500', children, ...rest } = props;
  const theme = useTheme();

  return (
    <StyledTextInput theme={theme} color={color} {...rest} ref={ref}>{children}</StyledTextInput>
  )
});

TextInput.displayName = "TextInput";
