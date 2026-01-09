import React from 'react';
import Layout from './src/components/shared/Layout';
import './founder_story.css';

function FounderStory() {
  return (
    <Layout>
      <div className="container">
        <div className="founder-content">
          <h1>The Joy Behind Joy Juncture</h1>
          <div className="founder-story">
            <div className="story-section">
              <h2>Our Beginning</h2>
              <p>
                Joy Juncture was born from a simple observation: in our digital age, 
                genuine human connections were becoming rare. We wanted to create 
                experiences that bring people together in meaningful ways.
              </p>
            </div>
            
            <div className="story-section">
              <h2>The Vision</h2>
              <p>
                We envision a world where every gathering becomes a celebration, 
                where games are bridges between hearts, and where joy is not just 
                an emotion but a way of life.
              </p>
            </div>
            
            <div className="story-section">
              <h2>Our Mission</h2>
              <p>
                To create premium gaming experiences that foster connections, 
                build communities, and turn ordinary moments into extraordinary memories.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default FounderStory;