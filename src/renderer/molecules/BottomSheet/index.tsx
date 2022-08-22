import { memo } from 'react';
import BottomSheet from 'react-draggable-bottom-sheet';
import { DragIndicator, Title } from 'renderer/atoms';
import Icon from 'renderer/atoms/Icon';

const Z_INDEX_BASE = 20;

interface BottomSheetModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  close?: () => void;
  elevationLevel?: number;
  disabled?: boolean;
  hideDragIndicator?: boolean;
  size?: 'sm' | 'md' | 'lg';
  title?: string;
}

const BottomSheetModal = ({
  children,
  isOpen,
  close = () => {},
  elevationLevel = 1,
  disabled,
  hideDragIndicator = false,
  size = 'md',
  title,
}: BottomSheetModalProps) => {
  const maxWidth = (() => {
    if (size === 'sm') return 358;
    if (size === 'lg') return 1024;
    // md
    return 768;
  })();

  return (
    <BottomSheet
      isOpen={isOpen}
      close={close}
      disabled={disabled}
      classNames={{
        window: {
          content:
            'text-white border-t-2 border-t-white rounded-none lg:border-white lg:rounded-lg lg:border-1',
        },
      }}
      onDrag={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}
      styles={{
        backdrop: {
          ...(isOpen && { backgroundColor: 'rgba(15, 14, 23)' }),
          opacity: isOpen ? 0.8 : 0,
          zIndex: elevationLevel * Z_INDEX_BASE,
        },
        bottomSheet: {
          zIndex: elevationLevel * Z_INDEX_BASE,
        },
        window: {
          wrap: {
            zIndex: elevationLevel * Z_INDEX_BASE * 2,
            backgroundColor: 'transparent',
            maxWidth,
          },
          content: {
            backgroundColor: 'rgb(0 0 0 / var(--tw-bg-opacity))',
            opacity: isOpen ? 1 : 0,
            transition: 'opacity 0.2s ease-in-out',
          },
        },
        dragIndicator: {
          indicator: {
            backgroundColor: 'rgb(255 255 254 / var(--tw-text-opacity))',
          },
        },
      }}
      modalOnDesktop
      onMouseDown={(event) => {
        event.stopPropagation();
      }}
      onStart={(event) => {
        event.stopPropagation();
      }}
    >
      {!hideDragIndicator && <DragIndicator />}
      <div className="px-4 max-w-screen-lg w-full mx-auto lg:px-6">
        {title && (
          <div className="pt-2 pb-4 flex justify-between lg:pt-6">
            <Title>{title}</Title>

            <div className="hidden lg:block">
              <Icon name="close" className="cursor-pointer" onClick={close} />
            </div>
          </div>
        )}
        {children}
      </div>
    </BottomSheet>
  );
};

BottomSheetModal.defaultProps = {
  elevationLevel: 1,
  disabled: false,
  close: () => {},
  hideDragIndicator: false,
  size: 'md',
  title: '',
};

export default memo(BottomSheetModal);
