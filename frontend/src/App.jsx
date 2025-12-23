import { Routes, Route } from 'react-router-dom';
import HomePage from './components/homepage';
import ReviewPage from './components/reviewpage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/reviews" element={<ReviewPage />} />
    </Routes>
  );
}

export default App;

