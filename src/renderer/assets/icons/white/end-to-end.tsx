import { memo, ReactNode } from 'react';

const EntToEnd: React.FC<ReactNode> = () => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.29291 18.7426L3.05027 14.5L7.29291 10.2573"
        stroke="#FFFFFE"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.05028 14.5H12.9498"
        stroke="#FFFFFE"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.7071 5.25732L20.9498 9.49996L16.7071 13.7426"
        stroke="#FFFFFE"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.9497 9.49998H11.0503"
        stroke="#FFFFFE"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(EntToEnd);
