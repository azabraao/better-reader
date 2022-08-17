import { api } from './api';

interface GetRankingProps {
  page: number;
  start: number;
}

const getRanking = async ({
  page,
  start,
}: GetRankingProps): Promise<PracticeItem[]> => {
  const response = await api.get(
    `/ranking?_sort=points&_order=desc&_limit=10&page=${page}&_start=${start}`
  );

  return response.data;
};

export default getRanking;
