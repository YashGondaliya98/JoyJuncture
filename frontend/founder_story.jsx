import React from 'react';
import { useNavigate } from 'react-router-dom';
import './founder_story.css';

function FounderStory() {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <h1>Founder Story</h1>
      <p>Coming soon...</p>
      <button onClick={() => goTo('/')}>Back to Home</button>
    </div>
  );
}

export default FounderStory;