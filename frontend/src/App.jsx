import { Routes, Route } from 'react-router-dom';
import HomePage from './components/homepage';
import ReviewPage from './components/reviewpage';
import GameStore from './components/gamestore';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/reviews" element={<ReviewPage />} />
      <Route path="/gamestore" element={<GameStore />} />
    </Routes>
  );
}

export default App;

