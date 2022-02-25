import React, { FC } from 'react';
import styled from 'styled-components'
import { ArrowBack as BackIcon } from '@styled-icons/typicons/ArrowBack';

const StyledCloseButton = styled(BackIcon)`
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
`;

interface IBackButtonProps {
  className?: string;
  onClick: () => void;
}

export const BackButton: FC<IBackButtonProps> = (props: IBackButtonProps) => {
  const { onClick, className } = props;

  return (
    <StyledCloseButton onClick={onClick} className={className} />
  )
}
