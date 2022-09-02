import { memo, useMemo, useState, useCallback } from 'react';
import clsx from 'clsx';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ifSpaceBar, monthNameByDate } from 'renderer/utils';

interface ChartProps {
  data: PracticeItem[];
}

const Chart = ({ data }: ChartProps) => {
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

  const practices = useMemo(() => {
    const withMonth = data.map((day: PracticeItem) => {
      day.month = monthNameByDate(day.createdAt);

      return day;
    });

    const ordered = withMonth.sort((a: PracticeItem, b: PracticeItem) => {
      const aMonth = new Date(a.createdAt).getMonth() + 1;
      const aYear = new Date(a.createdAt).getFullYear();
      const start = new Date(aYear, aMonth - 1, 1);
      const bMonth = new Date(b.createdAt).getMonth() + 1;
      const bYear = new Date(b.createdAt).getFullYear();
      const end = new Date(bYear, bMonth - 1, 1);

      return new Date(start).getTime() - new Date(end).getTime();
    });

    return ordered.map(
      (day: PracticeItem, index: number, array: PracticeItem[]) => {
        const currentMonth = new Date(day.createdAt).getMonth();
        const prevMonth = new Date(array[index - 1]?.createdAt).getMonth();

        const monthChanged = currentMonth !== prevMonth || index === 0;

        if (!monthChanged) {
          day.month = null;
        }

        return day;
      }
    );
  }, [data]);

  return (
    <div className="mt-7 max-w-full">
      <ResponsiveContainer width="100%" height={212}>
        <LineChart
          width={412}
          height={212}
          data={practices}
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
              dataKey="comprehension"
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
          Pontos
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
          Compreensão
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
          Palavras por minuto
        </div>
      </div>
    </div>
  );
};

export default memo(Chart);
