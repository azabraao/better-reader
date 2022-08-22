import { memo } from 'react';
import TwoFixations from './library/2-fixations.svg';
import ThreeFixations from './library/3-fixations.svg';
import Centered from './library/centered.svg';
import EndToEnd from './library/end-to-end.svg';
import Music from './library/music.svg';
import Plus from './library/plus.svg';
import PlusClean from './library/plus-clean.svg';
import Scanning from './library/scanning.svg';
import Speed from './library/speed.svg';
import Sweeping from './library/sweeping.svg';
import Tracking from './library/tracking.svg';
import Writing from './library/writing.svg';
import SquareUnchecked from './library/square.svg';
import SquareChecked from './library/square-checked.svg';
import ArrowDown from './library/arrow-down.svg';
import ArrowRight from './library/arrow-right.svg';
import ArrowTop from './library/arrow-top.svg';
import Exercise from './library/exercise.svg';
import Clock from './library/clock.svg';
import Close from './library/close.svg';
import CloseSM from './library/close-sm.svg';
import Checked from './library/checked.svg';
import CheckedSM from './library/checked-sm.svg';
import Play from './library/play.svg';
import Edit from './library/edit.svg';
import Trash from './library/trash.svg';
import ThreeDots from './library/three-dots.svg';

interface IconProps {
  name: Icon;
  color?: string;
  className?: string;
  onClick?: () => void;
}

const Icon = ({ name, color, className, onClick }: IconProps) => {
  switch (name) {
    case '2_fixations':
      return (
        <TwoFixations
          className={className}
          style={{ color }}
          onClick={onClick}
        />
      );
    case '3_fixations':
      return (
        <ThreeFixations
          className={className}
          style={{ color }}
          onClick={onClick}
        />
      );
    case 'centered':
      return (
        <Centered className={className} style={{ color }} onClick={onClick} />
      );
    case 'end_to_end':
      return (
        <EndToEnd className={className} style={{ color }} onClick={onClick} />
      );
    case 'music':
      return (
        <Music className={className} style={{ color }} onClick={onClick} />
      );
    case 'singing':
      return (
        <Music className={className} style={{ color }} onClick={onClick} />
      );
    case 'plus':
      return <Plus className={className} style={{ color }} onClick={onClick} />;
    case 'scanning':
      return (
        <Scanning className={className} style={{ color }} onClick={onClick} />
      );
    case 'speed':
      return (
        <Speed className={className} style={{ color }} onClick={onClick} />
      );
    case 'sweeping':
      return (
        <Sweeping className={className} style={{ color }} onClick={onClick} />
      );
    case 'tracking':
      return (
        <Tracking className={className} style={{ color }} onClick={onClick} />
      );
    case 'writing':
      return (
        <Writing className={className} style={{ color }} onClick={onClick} />
      );
    case 'checked':
      return (
        <Checked className={className} style={{ color }} onClick={onClick} />
      );
    case 'square':
      return (
        <SquareUnchecked
          className={className}
          style={{ color }}
          onClick={onClick}
        />
      );
    case 'square_checked':
      return (
        <SquareChecked
          className={className}
          style={{ color }}
          onClick={onClick}
        />
      );
    case 'arrow_down':
      return (
        <ArrowDown className={className} style={{ color }} onClick={onClick} />
      );
    case 'arrow_right':
      return (
        <ArrowRight className={className} style={{ color }} onClick={onClick} />
      );
    case 'arrow_top':
      return (
        <ArrowTop className={className} style={{ color }} onClick={onClick} />
      );
    case 'exercise':
      return (
        <Exercise className={className} style={{ color }} onClick={onClick} />
      );
    case 'plus_clean':
      return (
        <PlusClean className={className} style={{ color }} onClick={onClick} />
      );
    case 'clock':
      return (
        <Clock className={className} style={{ color }} onClick={onClick} />
      );
    case 'close':
      return (
        <Close className={className} style={{ color }} onClick={onClick} />
      );
    case 'checked-sm':
      return (
        <CheckedSM className={className} style={{ color }} onClick={onClick} />
      );
    case 'close-sm':
      return (
        <CloseSM className={className} style={{ color }} onClick={onClick} />
      );
    case 'play':
      return <Play className={className} style={{ color }} onClick={onClick} />;
    case 'edit':
      return <Edit className={className} style={{ color }} onClick={onClick} />;
    case 'trash':
      return (
        <Trash className={className} style={{ color }} onClick={onClick} />
      );
    case 'three_dots':
      return (
        <ThreeDots className={className} style={{ color }} onClick={onClick} />
      );
    default:
      return null;
  }
};

Icon.defaultProps = {
  color: 'currentColor',
  className: '',
  onClick: () => {},
};

export {
  TwoFixations,
  ThreeFixations,
  Centered,
  EndToEnd,
  Music,
  Plus,
  Scanning,
  Speed,
  Sweeping,
  Tracking,
  Writing,
  SquareUnchecked,
  SquareChecked,
  ArrowDown,
  ArrowRight,
  ArrowTop,
  Exercise,
  PlusClean,
  Clock,
  Close,
  Checked,
  CheckedSM,
  CloseSM,
  Play,
  Edit,
  Trash,
  ThreeDots,
};

export default memo(Icon);
