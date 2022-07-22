import {
  TwoFixations,
  ThreeFixations,
  Centered,
  EndToEnd,
  Music,
  Sondagem,
  Swiping,
  Tracking,
  Writing,
} from 'renderer/atoms/Icon';

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
