import { useEffect } from 'react';

export const useModalInitialization = () => {
  useEffect(() => {
    const root = document.getElementById('root');
    const node = document.createElement('div');

    node.style.position = 'fixed';
    node.style.top = '0';
    node.style.left = '0';
    
    root?.appendChild(node);
    node?.setAttribute('id', 'modal-root');

    return () => {
      root?.removeChild(node);
    }
  }, []);
}
