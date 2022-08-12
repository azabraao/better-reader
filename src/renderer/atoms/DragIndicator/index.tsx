import { memo } from 'react';

const DragIndicator = () => (
  <div className="w-full flex justify-center p-4 lg:hidden">
    <span className="bg-white rounded-lg h-1 w-14 block" />
  </div>
);

export default memo(DragIndicator);
