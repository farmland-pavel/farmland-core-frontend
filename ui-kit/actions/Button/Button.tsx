import React, { FC } from 'react';
import styled from 'styled-components';

import { IColor, ITheme } from '../../entities';
import { useTheme } from '../../context';

interface IStyledButtonProps {
  theme: ITheme;
  color: IColor;
  selectionColor: IColor;
}

const StyledButton = styled.button<IStyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  border-radius: 9999px;
  background-color: ${(props: IStyledButtonProps) => {
    const { theme, color } = props;
    const { global: { colors } } = theme;

    return colors[color];
  }};

  &:hover {
    background-color: ${(props: IStyledButtonProps) => {
    const { theme, selectionColor } = props;
    const { global: { colors } } = theme;

    return colors[selectionColor];
    }};
    box-shadow: ${(props: IStyledButtonProps) => {
      const { theme, selectionColor } = props;
      const { global: { colors } } = theme;

      return '0 0 0 0 1px ' + colors[selectionColor];
    }};
  }

  &:focus {
    outline: none;
  }
`;

interface IButtonProps {
  className?: string;
  color?: IColor;
  selectionColor?: IColor;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  type?: 'submit' | 'button';
}

export const Button: FC<IButtonProps> = (props: IButtonProps) => {
  const { isDisabled, isLoading, onClick, type='button', color='black', selectionColor=color, className, children } = props;
  const theme = useTheme();

  return <StyledButton theme={theme} color={color} selectionColor={selectionColor} className={className} onClick={onClick} type={type}>{children}</StyledButton>;
}
