import ThreeFixations from 'renderer/assets/icons/white/3-fixations';
import TwoFixations from 'renderer/assets/icons/white/2-fixations';
import Centered from 'renderer/assets/icons/white/centered';
import EndToEnd from 'renderer/assets/icons/white/end-to-end';
import Music from 'renderer/assets/icons/white/music';
import Sondagem from 'renderer/assets/icons/white/sondagem';
import Swiping from 'renderer/assets/icons/white/swiping';
import Tracking from 'renderer/assets/icons/white/tracking';
import Writing from 'renderer/assets/icons/white/writing';

export const writingDownWords = 'Writing down words';
export const techniques = [
  {
    label: 'All',
  },
  {
    label: 'Sweeping',
    icon: <Swiping />,
  },
  { label: writingDownWords, icon: <Writing /> },
  { label: '3 fixations', icon: <ThreeFixations /> },
  { label: '2 fixations', icon: <TwoFixations /> },
  { label: 'Rastreio', icon: <Tracking /> },
  { label: 'Sondagem', icon: <Sondagem /> },
  { label: 'Centralizada', icon: <Centered /> },
  { label: 'Ponta-a-ponta', icon: <EndToEnd /> },
  { label: 'Cantarolando', icon: <Music /> },
];
