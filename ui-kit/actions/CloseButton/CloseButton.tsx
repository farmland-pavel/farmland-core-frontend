import React, { FC } from 'react';
import styled from 'styled-components'
import { Close as CloseIcon } from '@styled-icons/material-rounded/Close';

const StyledCloseButton = styled(CloseIcon)`
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
`;

interface ICloseButtonProps {
  className?: string;
  onClick: () => void;
}

export const CloseButton: FC<ICloseButtonProps> = (props: ICloseButtonProps) => {
  const { onClick, className } = props;

  return (
    <StyledCloseButton role='button' onClick={onClick} className={className} />
  )
}
