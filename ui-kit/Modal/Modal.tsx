import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { ITheme } from '../entities';
import { useTheme } from '../context';

interface IStyledOverlayProps {
  theme: ITheme;
}

const StyledOverlay = styled.div<IStyledOverlayProps>`
  position: fixed;
  z-index: 10;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  background-color: ${(props: IStyledOverlayProps) => {
    const { theme } = props;
    const { global: { colors } } = theme;

    return colors['gray-600'];
  }}
`

interface IOverlayProps {
  className?: string;
  onClick: () => void;
}

const Overlay: FC<IOverlayProps> = (props: IOverlayProps) => {
  const { className, onClick } = props;
  const theme = useTheme();

  return (
    <StyledOverlay
      className={className}
      theme={theme}
      onClick={onClick}
    />
  )
}

interface IStyledHeaderProps {
  theme: ITheme;
}

const StyledHeader = styled.header<IStyledHeaderProps>`
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid ${(props: IStyledHeaderProps) => {
    const { theme } = props;
    const { global: { colors } } = theme;

    return colors['gray-400'];
  }}
`;

interface IHeaderProps {
  className?: string;
}

const Header: FC<IHeaderProps> = (props: IHeaderProps) => {
  const { className, children } = props;
  const theme = useTheme();

  return <StyledHeader theme={theme} className={className}>{children}</StyledHeader>
}

const StyledBody = styled.article`
  width: 100%;
  padding: 1rem;
  flex-grow: 1;
`;

interface IBodyProps {
  className?: string;
}

const Body: FC<IBodyProps> = (props: IBodyProps) => {
  const { className, children } = props;

  return <StyledBody className={className}>{children}</StyledBody>
}

interface IStyledFooterProps {
  theme: ITheme;
}

const StyledFooter = styled.footer<IStyledFooterProps>`
  width: 100%;
  padding: 1rem;
  border-top: 1px solid ${(props: IStyledFooterProps) => {
    const { theme } = props;
    const { global: { colors } } = theme;

    return colors['gray-400'];
  }}
`;

interface IFooterProps {
  className?: string;
}

const Footer: FC<IFooterProps> = (props: IFooterProps) => {
  const { className, children } = props;
  const theme = useTheme();

  return <StyledFooter theme={theme} className={className}>{children}</StyledFooter>
}

interface IStyledContentProps {
  theme: ITheme;
}

const StyledContent = styled.section<IStyledContentProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  z-index: 100;
  width: 50%;
  height: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.5rem;
  background-color: ${(props: IStyledContentProps) => {
    const { theme } = props;
    const { global: { colors } } = theme;

    return colors.white;
  }};
  box-shadow: ${(props: IStyledContentProps) => {
    const { theme } = props;
    const { global: { shadows } } = theme;

    return shadows.lg;
  }};
`;

interface IContentProps {
  className?: string
  id: string;
}

const Content: FC<IContentProps> = (props: IContentProps) => {
  const { id, className, children } = props;
  const theme = useTheme();

  return <StyledContent theme={theme} id={id} className={className}>{children}</StyledContent>
}

interface IModalComposition {
  Overlay: typeof Overlay;
  Content: typeof Content;
  Header: typeof Header;
  Body: typeof Body;
  Footer: typeof Footer;
}

interface IModalProps {
  isOpen: boolean;
}

export const Modal: FC<IModalProps> & IModalComposition = (props) => {
  const { children, isOpen } = props;

  if (!isOpen) return null;

  const portalRoot = window.document.getElementById('modal-root');

  return (portalRoot ? createPortal(children, portalRoot) : null)
}

Modal.Overlay = Overlay;
Modal.Content = Content;
Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
