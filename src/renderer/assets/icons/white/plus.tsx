import { memo, ReactNode } from 'react';

const Plus: React.FC<ReactNode> = () => {
  return (
    <svg
      width={27}
      height={27}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.4998 24.7082C19.4829 24.7082 24.3332 19.858 24.3332 13.8749C24.3332 7.89179 19.4829 3.04155 13.4998 3.04155C7.51675 3.04155 2.6665 7.89179 2.6665 13.8749C2.6665 19.858 7.51675 24.7082 13.4998 24.7082Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 9.54155V18.2082"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.1665 13.8749H17.8332"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(Plus);
