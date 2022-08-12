import { memo } from 'react';
import { createPortal } from 'react-dom';

const body = document.querySelector('body') as HTMLElement;

const PutItUnderBody = ({ children }: { children: React.ReactNode }) => {
  return createPortal(children, body);
};

export default memo(PutItUnderBody);
