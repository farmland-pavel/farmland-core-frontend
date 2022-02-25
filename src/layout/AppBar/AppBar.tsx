import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from 'src/store';

export const AppBar: FC = observer(() => {
  const { uiStore, authStore } = useRootStore();

  return (
    <div>

    </div>
  )
})

AppBar.displayName = 'AppBar';
