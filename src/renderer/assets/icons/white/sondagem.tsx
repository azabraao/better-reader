import { memo, ReactNode } from 'react';

const Sondagem: React.FC<ReactNode> = () => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.4444 1.5L20 5.23333M20 5.23333L16.4444 8.96667M20 5.23333H7.55556C6.61256 5.23333 5.55568 5.46653 4.88889 6.16667C4.22209 6.8668 4 7.50986 4 8.5C4 9.49014 4.44444 11.3 6.22222 11.7667C8 12.2333 12 11.7667 16.8889 11.7667C19.0246 11.7667 20 13.1667 20 15.9667M7.55556 22.5L4 18.7667M4 18.7667L7.55556 15.0333M4 18.7667H16.4444C17.3874 18.7667 18.4443 18.5335 19.1111 17.8333C19.7779 17.1332 20 16.4901 20 15.5C20 14.5099 19.5556 12.7 17.7778 12.2333C16 11.7667 12 12.2333 7.11111 12.2333C4.97539 12.2333 4 10.8333 4 8.03333"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(Sondagem);
