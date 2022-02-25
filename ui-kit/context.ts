import { createContext, useContext } from 'react';

import { ITheme } from './entities';

export const defaultTheme: ITheme = {
  inputs: {
    radio: {
      icon: {
        colors: {
          selection: 'blue-500',
          active: 'green-500',
          inactive: 'gray-500',
        }
      },
      label: {
        colors: {
          selection: 'blue-500',
          active: 'green-500',
          inactive: 'gray-500',
        }
      }
    }
  },
  global: {
    colors: {
      'inherit': 'inherit',
      'white': '#fff',
      'black': '#000',
      'green-400': '#4ade80',
      'green-500': '#22c55e',
      'green-600': '#16a34a',
      'yellow-400': '#facc15',
      'yellow-500': '#eab308',
      'yellow-600': '#ca8a04',
      'red-400': '#f87171',
      'red-500': '#f87171',
      'red-600': '#dc2626',
      'blue-400': '#60a5fa',
      'blue-500': '#3b82f6',
      'blue-600': '#2563eb',
      'gray-400': '#9ca3af',
      'gray-500': '#6b7280',
      'gray-600': '#4b5563',
    },
    shadows: {
      xs: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
    }
  }
};

export const UiKitContext = createContext<ITheme>(defaultTheme);

export const useTheme = () => useContext(UiKitContext);
