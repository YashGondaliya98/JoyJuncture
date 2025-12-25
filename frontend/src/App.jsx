import { Routes, Route } from 'react-router-dom';
import HomePage from './components/homepage';
import ReviewPage from './components/reviewpage';
import GameStore from './components/gamestore';
import ExplorePage from './components/explorepage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/reviews" element={<ReviewPage />} />
      <Route path="/gamestore" element={<GameStore />} />
      <Route path="/explore" element={<ExplorePage />} />
    </Routes>
  );
}

export default App;

