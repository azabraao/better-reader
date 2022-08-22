import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop } from 'renderer/atoms';

const body = document.querySelector('body') as HTMLElement;

const useBackdrop = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openBackdrop = () => setIsOpen(true);
  const closeBackdrop = () => setIsOpen(false);

  return createPortal(<div />, body);

  return {
    isOpen,
    openBackdrop,
    closeBackdrop,
  };
};

export default useBackdrop;
