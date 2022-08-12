import clsx from 'clsx';
import { memo } from 'react';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface TitleProps {
  children: React.ReactNode;
  /**
   * The heading level.
   * - 1: h1 24px
   * - 2: h2 20px
   * - 3: h3 18px
   * - 4: h4 16px
   * - 5: h5 14px
   * - 6: h6 12px
   * @default 2
   */
  level?: HeadingLevel;
}

const Title = ({ level, children }: TitleProps) => {
  const CustomTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <CustomTag
      className={clsx(
        'font-bold',
        level === 1 && 'text-2xl lg:text-3xl',
        level === 2 && 'text-xl lg:text-2xl',
        level === 3 && 'text-lg lg:text-xl',
        level === 4 && 'text-base lg:text-lg',
        level === 5 && 'text-sm lg:text-base',
        level === 6 && 'text-xs lg:text-sm'
      )}
    >
      {children}
    </CustomTag>
  );
};

Title.defaultProps = {
  level: 2,
};

export default memo(Title);
