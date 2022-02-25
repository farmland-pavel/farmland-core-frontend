import React, { FC } from 'react';
import styled from 'styled-components';

import { ITheme, IColor } from '../entities';
import { useTheme } from '../context';

interface IStyledTextProps {
  theme: ITheme;
  color: IColor;
}

const StyledText = styled.span<IStyledTextProps>`
  color: ${(props: IStyledTextProps) => {
    const { theme, color } = props;
    const { global: { colors } } = theme;

    return colors[color];
}}`;

interface ITextProps {
  className?: string;
  color?: IColor;
}

export const Text: FC<ITextProps> = (props: ITextProps) => {
  const { color='inherit', className, children } = props;
  const theme = useTheme();

  return (
    <StyledText theme={theme} color={color} className={className}>{children}</StyledText>
  )
}
