type PracticeItem = {
  points: number;
  words: number;
  ppm: number;
  date: string;
  month?: string | null;
  comprehension: number;
  techniques: string[];
};

type Technique =
  | 'sweeping'
  | '3 fixations'
  | '2 fixations'
  | 'rastreio'
  | 'sondagem'
  | 'centralizada'
  | 'ponta-a-ponta'
  | 'Cantarolando'
  | 'writing down words';

type TrainingUnit = {
  techniques: Technique[];
  target: number;
  duration: number;
};

type TrainingSession = {
  id: string;
  name: string;
  units: TrainingUnit[];
};
