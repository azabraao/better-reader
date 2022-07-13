import { memo, ReactNode } from 'react';
import EndToEnd from 'renderer/assets/icons/white/end-to-end';
import Plus from 'renderer/assets/icons/white/plus';
import Speed from 'renderer/assets/icons/white/speed';
import Swiping from 'renderer/assets/icons/white/swiping';
import { Section } from 'renderer/atoms';

const Practices: React.FC<ReactNode> = () => {
  return (
    <Section title="Training Sessions">
      <div className="flex gap-4 no-scrollbar overflow-y-auto flex-wrap">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-2 rounded-lg text-white p-2 border-white border-1">
            <span className="font-medium whitespace-nowrap">
              Varredura & ponta-ponta
            </span>
            <div className="flex gap-2 items-center">
              <Swiping />
              <EndToEnd />
              <div className="ml-1 flex gap-2 items-center">
                <Speed />
                500ppm
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-2 rounded-lg text-white p-2 border-white border-1">
            <span className="font-medium whitespace-nowrap">
              Somente Varredura
            </span>
            <div className="flex gap-2 items-center">
              <Swiping />
              <div className="ml-1 flex gap-2 items-center">
                <Speed />
                1000ppm
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-2 rounded-lg text-white p-2 border-white border-1 items-center">
            <span className="font-medium whitespace-nowrap">
              Add Training Session
            </span>
            <Plus />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default memo(Practices);
