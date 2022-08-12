import { memo } from 'react';
import { PutItUnderBody } from 'renderer/layout';

interface FloatingButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
}

const FloatingButton = ({ onClick, icon }: FloatingButtonProps) => {
  return (
    <PutItUnderBody>
      <div className="fixed z-10 right-0 bottom-0 flex justify-center p-4">
        <button
          type="button"
          onClick={onClick}
          data-testid="floating-button"
          className="bg-info-500 text-black hover:bg-info-700 rounded-full shadow-elevation-1 p-6 flex items-center justify-center transition-all"
        >
          {icon}
        </button>
      </div>
    </PutItUnderBody>
  );
};

export default memo(FloatingButton);
