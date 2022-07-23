import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './main.css';
import 'react-loading-skeleton/dist/skeleton.css';

import Home from 'renderer/pages/home';
import { SkeletonTheme } from 'react-loading-skeleton';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { RankingProvider } from './contexts/Ranking';
import { WindowTitleBar } from './molecules';
import { PracticesProvider } from './contexts';

const queryClient = new QueryClient();

const App = () => {
  return (
    <SkeletonTheme baseColor="#797B8B" highlightColor="#A7A9BE">
      <QueryClientProvider client={queryClient}>
        <RankingProvider>
          <PracticesProvider>
            <WindowTitleBar />
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </Router>
            <Toaster />
          </PracticesProvider>
        </RankingProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SkeletonTheme>
  );
};

export default App;
