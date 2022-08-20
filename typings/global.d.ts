type PracticeType = {
  words: number;
  ppm: number;
  comprehension: number;
  techniques: Technique[];
};

type PracticeItem = {
  points: number;
  words?: number;
  ppm: number;
  createdAt: Date;
  updatedAt: Date;
  month?: string | null;
  comprehension: number;
  techniques: string[];
};

type PracticePayload = {
  words: number;
  ppm: number;
  comprehension: number;
  techniques: Technique[];
};

type Technique =
  | 'sweeping'
  | '3_fixations'
  | '2_fixations'
  | 'tracking'
  | 'scanning'
  | 'centered'
  | 'end_to_end'
  | 'singing'
  | 'writing';

type TechniqueItem = {
  label: string;
  value: Technique;
};

type TrainingUnit = {
  techniques: Technique[];
  target: number;
  duration: number;
};

type TrainingSession = {
  _id: string;
  name: string;
  summary: {
    target: number;
    duration: number;
    techniques: Technique[];
  };
  units: TrainingUnit[];
};

type TrainingSessionPayload = {
  name: string;
  units: TrainingUnit[];
};

type RankingPayload = {
  page: number;
  limit: number;
};

type RankData = {
  rank: PracticeItem[];
  count: number;
};
