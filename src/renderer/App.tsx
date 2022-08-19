import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './main.css';
import 'react-loading-skeleton/dist/skeleton.css';

import Home from 'renderer/pages/home';
import { SkeletonTheme } from 'react-loading-skeleton';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { WindowTitleBar } from './molecules';

const queryClient = new QueryClient();

const App = () => {
  return (
    <SkeletonTheme baseColor="#797B8B" highlightColor="#A7A9BE">
      <QueryClientProvider client={queryClient}>
        <WindowTitleBar />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SkeletonTheme>
  );
};

export default App;
