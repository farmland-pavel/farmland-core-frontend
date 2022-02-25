import React, { FC, useMemo } from 'react';
import merge from 'lodash/merge';

import { ITheme } from './entities';
import { UiKitContext, defaultTheme } from './context';

import { useModalInitialization } from './Modal/hooks';

interface IUiKitProviderProps {
  theme?: Partial<ITheme>;
}

export const UiKitProvider: FC<IUiKitProviderProps> = (props: IUiKitProviderProps) => {
  const { theme = {}, children } = props;

  const value: ITheme = useMemo(() => merge({}, defaultTheme, theme), [theme]);

  useModalInitialization();

  return (
    <UiKitContext.Provider value={value}>
      {children}
    </UiKitContext.Provider>
  )
}
