import { memo, ReactNode } from 'react';

const ThreeFixations: React.FC<ReactNode> = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="12" width="21" height="2" fill="#FFFFFE" />
      <circle cx="21" cy="13" r="3" fill="#FFFFFE" />
      <circle cx="12" cy="13" r="3" fill="#FFFFFE" />
      <circle cx="3" cy="13" r="3" fill="#FFFFFE" />
    </svg>
  );
};

export default memo(ThreeFixations);
