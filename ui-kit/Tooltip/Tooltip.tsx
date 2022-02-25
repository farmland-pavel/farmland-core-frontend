import React, { ReactNode, FC, useEffect, useRef, useState, createContext, useContext, useMemo } from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';

type IPlacement = 'top-center' | 'right-center' | 'bottom-center' | 'left-center';

const TOOLTIP_ARROW_SIZE_IN_PX = 16;

interface ITooltipContext {
  targetId: string;
  tooltipId: string;
  placement: IPlacement;
}

const TooltipContext = createContext<ITooltipContext>({
  placement: 'top-center',
  targetId: 'target-id',
  tooltipId: 'tooltip-id',
});

interface ITooltipProps {
  targetId: string;
  tooltipId: string;
  placement: IPlacement;
  children?: ReactNode;
}

export const Tooltip: FC<ITooltipProps> = (props: ITooltipProps) => {
  const { targetId, tooltipId, placement, children } = props;
  const [isOpen, setIsOpen] = useState(false);

  const tooltipContextValue: ITooltipContext = useMemo(() => {
    return { targetId, tooltipId, placement };
  }, [targetId, tooltipId, placement]);

  useEffect(() => {
    const element = document.getElementById(targetId);

    const handleElementMouseOver = () => {
      setIsOpen(true)
    };

    const handleElementMouseLeave = () => {
      setIsOpen(false);
    };

    element?.addEventListener('mouseover', handleElementMouseOver);
    element?.addEventListener('mouseleave', handleElementMouseLeave);

    return () => {
      element?.removeEventListener('mouseover', handleElementMouseOver)
      element?.removeEventListener('mouseleave', handleElementMouseLeave)
    };
  }, [targetId]);

  return isOpen ? <TooltipContext.Provider value={tooltipContextValue}><TooltipContainer>{children}</TooltipContainer></TooltipContext.Provider> : null
}

interface IStyledTooltipContainerProps {
  placement: IPlacement;
  top: number;
  left: number;
  height: number;
  width: number;
}

const StyledTooltipContainer = styled.div<IStyledTooltipContainerProps>`
  transform: translate(${({ placement }) => {
    if (placement === 'top-center') return '-50%, -100%';
    if (placement === 'right-center') return '0%, -50%';
    if (placement === 'bottom-center') return '-50%, 0%';
    if (placement === 'left-center') return '-100%, -50%';
  }});
  top: ${({ placement, top, height }) => {
    if (placement === 'top-center') return `${top - TOOLTIP_ARROW_SIZE_IN_PX}`;
    if (placement === 'right-center') return `${top + height / 2}`;
    if (placement === 'bottom-center') return `${top + height + TOOLTIP_ARROW_SIZE_IN_PX}`;
    if (placement === 'left-center') return `${top + height / 2}`;
  }}px;
  left: ${({ placement, left, width }) => {
    if (placement === 'top-center') return `${left + width / 2}`;
    if (placement === 'right-center') return `${left + width + TOOLTIP_ARROW_SIZE_IN_PX}`;
    if (placement === 'bottom-center') return `${left + width / 2}`;
    if (placement === 'left-center') return `${left - TOOLTIP_ARROW_SIZE_IN_PX}`;
  }}px;
`

interface ITooltipContainerProps {
  children?: ReactNode;
}

const TooltipContainer: FC<ITooltipContainerProps> = (props: ITooltipContainerProps) => {
  const { targetId, tooltipId, placement } = useContext(TooltipContext);
  const portalNode = useRef(document.createElement('div'));

  useEffect(() => {
    const root = document.getElementById('root');
    const node = portalNode.current;
    node?.setAttribute('id', tooltipId);
    root?.appendChild(node);

    return () => {
      root?.removeChild(node);
    };
  }, [tooltipId]);

  const { top = 0, left = 0, height = 0, width = 0 } = document.getElementById(targetId)?.getBoundingClientRect() || {};

  return (
    ReactDOM.createPortal(
      <StyledTooltipContainer
        id={tooltipId}
        role="tooltip"
        placement={placement}
        top={top}
        left={left}
        height={height}
        width={width}
        className="tooltip absolute z-10000 inline-block bg-gray-900 shadow-sm py-2 px-3 rounded-lg">
        {props.children}
      </StyledTooltipContainer>,
      portalNode.current
    )
  )
}

interface ITooltipContentProps {
  children?: ReactNode;
}

export const TooltipContent: FC<ITooltipContentProps> = (props: ITooltipContentProps) => {
  return <div className="font-medium text-white text-sm">{props.children}</div>
}

interface IStyledTooltipArrowProps {
  placement: IPlacement;
}

const StyledTooltipArrow = styled.div<IStyledTooltipArrowProps>`
  width: 16px;
  height: 16px;
  border-left-width: 8px;
  border-right-width: 8px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-width: 12px;
  transform: translate(${({ placement }) => {
    if (placement === 'top-center') return '-50%, 0';
    if (placement === 'right-center') return '-100%, -50%';
    if (placement === 'bottom-center') return '-50%, -100%';
    if (placement === 'left-center') return '0, -50%';
  }}) rotate(${({ placement }) => {
    if (placement === 'top-center') return 180;
    if (placement === 'right-center') return -90;
    if (placement === 'bottom-center') return 0;
    if (placement === 'left-center') return 90;
  }}deg);
  top: ${({ placement }) => {
    if (placement === 'top-center') return 100;
    if (placement === 'right-center') return 50;
    if (placement === 'bottom-center') return 0;
    if (placement === 'left-center') return 50;
  }}%;
  left: ${({ placement }) => {
    if (placement === 'top-center') return 50;
    if (placement === 'right-center') return 0;
    if (placement === 'bottom-center') return 50;
    if (placement === 'left-center') return 100;
  }}%;
`

export const TooltipArrow: FC = () => {
  const { placement } = useContext(TooltipContext);

  return <StyledTooltipArrow placement={placement} className="absolute z-1000" />
}
