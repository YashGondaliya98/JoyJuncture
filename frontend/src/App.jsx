import { Routes, Route } from 'react-router-dom';
import HomePage from './components/homepage';
import ReviewPage from './components/reviewpage';
import GameStore from './components/gamestore';
import ExplorePage from './components/explorepage';
import AboutPage from '../about_us';
import FoundersPage from '../FoundersPage';
import LoginPage from '../login';
import CreateAccountPage from '../CreateAccount';
import ProfilePage from '../profile';
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/reviews" element={<ReviewPage />} />
      <Route path="/gamestore" element={<GameStore />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/about_us" element={<AboutPage />} />
      <Route path="/founder_story" element={<FoundersPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/create-account" element={<CreateAccountPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;