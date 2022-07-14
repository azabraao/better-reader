import { memo, useMemo, ReactNode, useState, useCallback } from 'react';
import clsx from 'clsx';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import useRanking from 'renderer/contexts/Ranking/useRanking';
import { ifSpaceBar, monthNameByDate } from 'renderer/utils';

const Chart: React.FC<ReactNode> = () => {
  const { rankingData } = useRanking();
  const [showPoints, setShowPoints] = useState(true);
  const [showComprehension, setShowComprehension] = useState(true);
  const [showWPM, setShowWPM] = useState(true);

  const toggleShowPoints = useCallback(
    () => setShowPoints(!showPoints),
    [showPoints]
  );
  const toggleShowComprehension = useCallback(
    () => setShowComprehension(!showComprehension),
    [showComprehension]
  );
  const toggleShowWPM = useCallback(() => setShowWPM(!showWPM), [showWPM]);

  const ranking = useMemo(() => {
    const withMonth = rankingData.map((day: any) => {
      day.month = monthNameByDate(day.date);

      return day;
    });

    const ordered = withMonth.sort((a: any, b: any) => {
      const aMonth = Number(a.date.split('/')[0]);
      const aYear = Number(a.date.split('/')[2]);
      const start = new Date(aYear, aMonth - 1, 1);
      const bMonth = Number(b.date.split('/')[0]);
      const bYear = Number(b.date.split('/')[2]);
      const end = new Date(bYear, bMonth - 1, 1);

      return new Date(start).getTime() - new Date(end).getTime();
    });

    return ordered.map((day: any, index: any, array: any) => {
      const monthChanged =
        day.date.split('/')[0] !==
          array[index === 0 ? 0 : index - 1].date?.split('/')[0] || index === 0;

      if (!monthChanged) {
        day.month = null;
      }

      return day;
    });
  }, [rankingData]);

  return (
    <div className="mt-7 max-w-full">
      <ResponsiveContainer width="100%" height={212}>
        <LineChart
          width={412}
          height={212}
          data={ranking}
          margin={{
            top: 0,
            right: 0,
            left: -16,
            bottom: 0,
          }}
          syncId="month"
        >
          <XAxis dataKey="month" fontSize={12} />
          <YAxis fontFamily="Arial" />
          <Tooltip />
          {showPoints && (
            <Line
              type="monotone"
              dataKey="points"
              stroke="#FF8906"
              activeDot={{ r: 8 }}
              strokeWidth={5}
              dot={false}
            />
          )}
          {showComprehension && (
            <Line
              dot={false}
              type="monotone"
              dataKey="words"
              stroke="#E53170"
              strokeWidth={5}
            />
          )}

          {showWPM && (
            <Line
              dot={false}
              type="monotone"
              dataKey="ppm"
              stroke="#9EE493"
              strokeWidth={5}
            />
          )}
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-8 text-white">
        <div
          onKeyDown={(e) => ifSpaceBar(e, toggleShowPoints)}
          onClick={toggleShowPoints}
          role="button"
          tabIndex={0}
          className="flex flex-row items-center cursor-pointer"
        >
          <span
            className={clsx(
              'block w-4 h-4 border-highlight border-1 mr-2',
              showPoints && 'bg-highlight'
            )}
          />
          Points
        </div>
        <div
          onKeyDown={(e) => ifSpaceBar(e, toggleShowPoints)}
          onClick={toggleShowComprehension}
          role="button"
          tabIndex={0}
          className="flex flex-row items-center cursor-pointer"
        >
          <span
            className={clsx(
              'block w-4 h-4 border-danger border-1 mr-2',
              showComprehension && 'bg-danger'
            )}
          />
          Comprehension
        </div>
        <div
          onKeyDown={(e) => ifSpaceBar(e, toggleShowPoints)}
          onClick={toggleShowWPM}
          role="button"
          tabIndex={0}
          className="flex flex-row items-center cursor-pointer"
        >
          <span
            className={clsx(
              'block w-4 h-4 border-success border-1 mr-2',
              showWPM && 'bg-success'
            )}
          />
          Words Per Minute
        </div>
      </div>
    </div>
  );
};

export default memo(Chart);
