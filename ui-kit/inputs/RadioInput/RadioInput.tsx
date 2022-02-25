import React, { FC, createContext, useContext, useMemo, ChangeEvent, useState } from 'react';
import styled from 'styled-components';

import { ITheme } from '../../entities';
import { useTheme } from '../../context';

interface IRadioInputContextValue {
  isActive: boolean;
  isSelected: boolean;
}

const radioInputContextValue: IRadioInputContextValue = {
  isActive: false,
  isSelected: false,
}

const RadioInputContext = createContext(radioInputContextValue);

interface IIStyledIconProps {
  theme: ITheme;
  isActive: boolean;
  isSelected: boolean;
}

const StyledIcon = styled.div<IIStyledIconProps>`
  width: 1rem;
  height: 1rem;
  border: 1px solid ${(props: IIStyledIconProps) => {
    const { theme, isActive, isSelected } = props;
    const { global: { colors }, inputs: { radio: { icon: { colors: { active, selection, inactive } } } } } = theme;

    if (isActive) return colors[active];
    if (!isActive && isSelected) return colors[selection];
    if (!isActive && !isSelected) return colors[inactive];
  }};
  border-radius: 1rem;
  background-color: #fff;
  color: ${(props: IIStyledIconProps) => {
    const { theme, isActive, isSelected } = props;
    const { global: { colors }, inputs: { radio: { icon: { colors: { active, selection, inactive } } } } } = theme;

    if (isActive) return colors[active];
    if (!isActive && isSelected) return colors[selection];
    if (!isActive && !isSelected) return colors[inactive];
  }};
`;

interface IIconProps {
  className?: string;
}

export const Icon: FC<IIconProps> = (props: IIconProps) => {
  const { className, children } = props;

  const theme = useTheme();
  
  const { isActive, isSelected } = useContext(RadioInputContext);

  return (
    <StyledIcon theme={theme} className={className} isActive={isActive} isSelected={isSelected}>{children}</StyledIcon>
  )
}

interface IStyledLabelProps {
  theme: ITheme;
  isActive: boolean;
  isSelected: boolean;
}

const StyledLabel = styled.div<IStyledLabelProps>`
  color: ${(props: IStyledLabelProps) => {
    const { theme, isActive, isSelected } = props;
    const { global: { colors }, inputs: { radio: { label: { colors: { active, selection, inactive } } } } } = theme;

    if (isActive) return colors[active];
    if (!isActive && isSelected) return colors[selection];
    if (!isActive && !isSelected) return colors[inactive];
  }};
`;

interface ILabelProps {
  className?: string;
}

export const Label: FC<ILabelProps> = (props: ILabelProps) => {
  const { className, children } = props;

  const theme = useTheme();

  const { isActive, isSelected } = useContext(RadioInputContext);

  return (
    <StyledLabel theme={theme} className={className} isActive={isActive} isSelected={isSelected}>{children}</StyledLabel>
  )
}

const StyledHtmlInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

interface IRadioInputProps {
  className?: string;
  name: string;
  value: string;
  isActive: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface IRadioInputComposition {
  Icon: typeof Icon;
  Label: typeof Label;
}

export const RadioInput: FC<IRadioInputProps> & IRadioInputComposition = (props: IRadioInputProps) => {
  const { className, name, value, isActive, onChange, children } = props;

  const [isSelected, setIsSelected] = useState(false);

  const id = name + '-' + value;

  const inputId = 'input' + '-' + id;

  const contextValue = useMemo(() => {
    return {
      isActive,
      isSelected,
    }
  }, [isActive, isSelected]);

  const handleMouseEnter = () => setIsSelected(true);

  const handleMouseLeave = () => setIsSelected(false);

  return (
    <RadioInputContext.Provider value={contextValue}>
      <StyledHtmlInput type='radio' id={inputId} name={name} value={value} checked={isActive} onChange={onChange} />
      <label htmlFor={inputId} id={id} className={className} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{children}</label>
    </RadioInputContext.Provider>
  )
}

RadioInput.Icon = Icon;
RadioInput.Label = Label;
