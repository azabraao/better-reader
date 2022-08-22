/* eslint-disable react/no-unescaped-entities */
import { memo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from 'renderer/atoms';
import toast from 'react-hot-toast';
import { deleteTrainingSession } from 'renderer/services';
import BottomSheet from '../../BottomSheet';
import { useTrainingSessionCard } from '../Context';

interface DeleteBottomSheetProps {
  isOpen: boolean;
  close: () => void;
}

const DeleteBottomSheet = ({ isOpen, close }: DeleteBottomSheetProps) => {
  const { session } = useTrainingSessionCard();

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    ['deleteTrainingSession'],
    deleteTrainingSession
  );

  const handleDelete = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();

    if (isLoading) return;

    mutate(session._id, {
      onSuccess: () => {
        queryClient.invalidateQueries(['getTrainingSessions']);
        close();
      },
      onError: () => {
        toast.error('Error on deleting training session, please try again');
        close();
      },
    });
  };

  return (
    <BottomSheet size="sm" title="Are you sure?" isOpen={isOpen} close={close}>
      <div className="flex flex-col gap-4 pb-6 pt-2">
        <Button
          size="sm"
          fullWidth
          theme="danger"
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? 'Deleting...' : 'Yes, delete this training session'}
        </Button>
        <Button
          fullWidth
          onClick={(e) => {
            e.stopPropagation();
            close();
          }}
          size="sm"
          disabled={isLoading}
        >
          No, don't delete
        </Button>
      </div>
    </BottomSheet>
  );
};

export default memo(DeleteBottomSheet);
