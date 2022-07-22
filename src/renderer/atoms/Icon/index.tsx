import { memo } from 'react';
import TwoFixations from './library/2-fixations.svg';
import ThreeFixations from './library/3-fixations.svg';
import Centered from './library/centered.svg';
import EndToEnd from './library/end-to-end.svg';
import Music from './library/music.svg';
import Plus from './library/plus.svg';
import Sondagem from './library/sondagem.svg';
import Speed from './library/speed.svg';
import Swiping from './library/swiping.svg';
import Tracking from './library/tracking.svg';
import Writing from './library/writing.svg';
import SquareUnchecked from './library/square.svg';
import SquareChecked from './library/square-checked.svg';
import ArrowDown from './library/arrow-down.svg';
import ArrowRight from './library/arrow-right.svg';
import ArrowTop from './library/arrow-top.svg';

interface IconProps {
  name: string;
  color?: string;
  className?: string;
}

const Icon = ({ name, color, className }: IconProps) => {
  switch (name) {
    case '2-fixations':
      return <TwoFixations className={className} style={{ color }} />;
    case '3-fixations':
      return <ThreeFixations className={className} style={{ color }} />;
    case 'centered':
      return <Centered className={className} style={{ color }} />;
    case 'end-to-end':
      return <EndToEnd className={className} style={{ color }} />;
    case 'music':
      return <Music className={className} style={{ color }} />;
    case 'plus':
      return <Plus className={className} style={{ color }} />;
    case 'sondagem':
      return <Sondagem className={className} style={{ color }} />;
    case 'speed':
      return <Speed className={className} style={{ color }} />;
    case 'swiping':
      return <Swiping className={className} style={{ color }} />;
    case 'tracking':
      return <Tracking className={className} style={{ color }} />;
    case 'writing':
      return <Writing className={className} style={{ color }} />;
    case 'square':
      return <SquareUnchecked className={className} style={{ color }} />;
    case 'square-checked':
      return <SquareChecked className={className} style={{ color }} />;
    case 'arrow-down':
      return <ArrowDown className={className} style={{ color }} />;
    case 'arrow-right':
      return <ArrowRight className={className} style={{ color }} />;
    case 'arrow-top':
      return <ArrowTop className={className} style={{ color }} />;
    default:
      return null;
  }
};

Icon.defaultProps = {
  color: '#fff',
  className: '',
};

export {
  TwoFixations,
  ThreeFixations,
  Centered,
  EndToEnd,
  Music,
  Plus,
  Sondagem,
  Speed,
  Swiping,
  Tracking,
  Writing,
  SquareUnchecked,
  SquareChecked,
  ArrowDown,
  ArrowRight,
  ArrowTop,
};

export default memo(Icon);
