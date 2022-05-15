import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './main.css';
import Home from 'renderer/pages/home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
