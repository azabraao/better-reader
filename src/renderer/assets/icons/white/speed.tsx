import { memo, ReactNode } from 'react';

const Speed: React.FC<ReactNode> = () => {
  return (
    <svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.8994 2.87488L3.89941 14.8749H12.8994L11.8994 22.8749L21.8994 10.8749H12.8994L13.8994 2.87488Z"
        stroke="#FFFFFE"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(Speed);
