import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './main.css';
import 'react-loading-skeleton/dist/skeleton.css';

import Home from 'renderer/pages/home';
import { SkeletonTheme } from 'react-loading-skeleton';
import { RankingProvider } from './contexts/Ranking';
import Header from './molecules/Header';

const App = () => {
  return (
    <SkeletonTheme baseColor="#797B8B" highlightColor="#A7A9BE">
      <RankingProvider>
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
        <Toaster />
      </RankingProvider>
    </SkeletonTheme>
  );
};

export default App;
