export type IColor =
  'inherit' |
  'white' |
  'black' |
  'green-400' |
  'green-500' |
  'green-600' |
  'yellow-400' |
  'yellow-500' |
  'yellow-600' |
  'red-400' |
  'red-500' |
  'red-600' |
  'blue-400' |
  'blue-500' |
  'blue-600' |
  'gray-400' |
  'gray-500' |
  'gray-600';

export type IShadow = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ITheme = {
  inputs: {
    radio: {
      icon: {
        colors: {
          selection: IColor;
          active: IColor;
          inactive: IColor;
        }
      },
      label: {
        colors: {
          selection: IColor;
          active: IColor;
          inactive: IColor;
        }
      }
    }
  },
  global: {
    colors: { [key in IColor]: string };
    shadows: { [key in IShadow]: string };
  }
};
