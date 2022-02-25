import React, { FC, ForwardedRef, forwardRef, MouseEventHandler } from 'react';
import styled from 'styled-components';

const StyledLink = styled.a`
  cursor: pointer;
`;

interface ILinkProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  href?: string;
}

export const Link: FC<ILinkProps> = forwardRef((props: ILinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { onClick, href, className, children } = props;

  return (
    <StyledLink href={href} onClick={onClick} ref={ref} className={className}>
      {children}
    </StyledLink>
  )
})

Link.displayName = 'Link';
