import { memo } from 'react';
import BottomSheet from 'react-draggable-bottom-sheet';
import { DragIndicator } from 'renderer/atoms';

const Z_INDEX_BASE = 20;

interface BottomSheetModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  close?: () => void;
  elevationLevel?: number;
  disabled?: boolean;
  hideDragIndicator?: boolean;
}

const BottomSheetModal = ({
  children,
  isOpen,
  close = () => {},
  elevationLevel = 1,
  disabled,
  hideDragIndicator = false,
}: BottomSheetModalProps) => {
  return (
    <BottomSheet
      isOpen={isOpen}
      close={close}
      disabled={disabled}
      classNames={{
        window: {
          wrap: 'text-white border-t-2 border-t-white rounded-none lg:border-white lg:rounded-lg lg:border-1',
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
            backgroundColor: 'rgb(0 0 0 / var(--tw-bg-opacity))',
            maxWidth: '1024px',
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
      {children}
    </BottomSheet>
  );
};

BottomSheetModal.defaultProps = {
  elevationLevel: 1,
  disabled: false,
  close: () => {},
  hideDragIndicator: false,
};

export default memo(BottomSheetModal);
