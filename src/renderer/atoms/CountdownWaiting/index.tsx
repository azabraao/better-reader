/* eslint-disable no-nested-ternary */

import Icon from '../Icon';

const Countdown = () => (
  <div className="flex justify-center py-6 text-muted">
    <div className="flex gap-2 items-center">
      <Icon name="play" />
      Waiting...
    </div>
  </div>
);

export default Countdown;
