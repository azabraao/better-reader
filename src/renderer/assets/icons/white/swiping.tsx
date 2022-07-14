import { memo, ReactNode } from 'react';

const Swiping: React.FC<ReactNode> = () => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.5 15H15V13.5H19.5V15ZM22.5 21H18V19.5H22.5V21ZM21 18H16.5V16.5H21V18Z"
        fill="currentColor"
      />
      <path
        d="M12.7523 15C12.747 14.3672 12.5782 13.7464 12.2623 13.1981C11.9464 12.6497 11.4941 12.1923 10.9493 11.8702L16.5 2.25L15.2025 1.5L9.51976 11.3445C8.82234 11.1887 8.09698 11.2102 7.41003 11.4072C6.72308 11.6041 6.09647 11.9701 5.58751 12.4718C2.77951 15.18 2.99701 21.5115 3.00751 21.78C3.01527 21.9737 3.09769 22.1568 3.23751 22.291C3.37733 22.4253 3.56369 22.5002 3.75751 22.5H15.0008C15.1582 22.5 15.3116 22.4505 15.4393 22.3584C15.567 22.2664 15.6625 22.1365 15.7123 21.9872C15.7621 21.8378 15.7636 21.6766 15.7166 21.5264C15.6697 21.3761 15.5767 21.2444 15.4508 21.15C12.7958 19.158 12.7523 15.0405 12.7523 15ZM8.94751 12.7477C9.54779 12.7543 10.1224 12.9921 10.5518 13.4116C10.9813 13.8311 11.2324 14.4 11.253 15C11.253 15.0285 11.2545 15.156 11.2658 15.3517L6.84076 13.3837C7.13224 13.1434 7.4686 12.9634 7.83028 12.8542C8.19195 12.745 8.57173 12.7088 8.94751 12.7477ZM11.5875 21C10.988 20.3896 10.6059 19.599 10.5 18.75H9.00001C9.05373 19.5482 9.30306 20.3209 9.72601 21H8.05876C7.75033 20.0267 7.56267 19.0191 7.50001 18H6.00001C6.04838 19.0161 6.21577 20.0229 6.49876 21H4.50001C4.52326 19.623 4.71751 16.581 5.85226 14.5853L11.502 17.0978C11.7735 18.5072 12.3522 19.8396 13.197 21H11.5875Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default memo(Swiping);
