import React from 'react';
import Layout from './src/components/shared/Layout';
import './founder_story.css';

const FoundersPage = () => {
  return (
    <Layout className="full-width">
      <section className="founder-section">
        <div className="container">
          <div className="founder-content">
            <h1>Our (Accidentally Awesome) Story</h1>
            
            <div className="founder-story">
              <div className="story-section">
                <h2>The Beginning</h2>
                <p>
                  <span className="highlight">Honestly?</span> There's no dramatic
                  "lifelong passion" backstory here—just two people who
                  figured out they're pretty good at creating chaos, laughter, and
                  the kind of competitive tension that turns friends into frenemies.
                </p>
              </div>
              
              <div className="story-section">
                <h2>The Journey</h2>
                <p>
                  Instead of sticking with the family business (textiles and
                  electricals—thrilling, right?), we thought, why not channel our
                  inner entrepreneurs? <strong>Spoiler:</strong> we have no idea what
                  we're doing, but we've got some "big" dreams for a
                  fancy office, preferably with a sea view and a foosball table.
                </p>
              </div>
              
              <div className="story-section">
                <h2>Today & Tomorrow</h2>
                <p>
                  Now here we are, turning what started as random ideas into something
                  real, fun, and (fingers crossed) successful. So, hop on board this wild ride—no family legacy here, just two
                  accidental game-makers with a knack for turning spontaneous ideas
                  into epic fun!
                </p>
              </div>
            </div>

            <div className="team-section">
              <h2>Meet the Minds Behind the Madness</h2>
              
              <div className="founders-grid">
                <div className="founder-card">
                  <div className="founder-name">Khushi Poddar</div>
                  <div className="founder-role">The Dreamer-in-Chief</div>
                  <div className="founder-desc">
                    With a knack for bringing wild ideas to life.
                  </div>
                </div>

                <div className="founder-card">
                  <div className="founder-name">Muskan Poddar</div>
                  <div className="founder-role">The Design Whiz</div>
                  <div className="founder-desc">
                    Making sure every card, board, and token looks as amazing as it
                    feels.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FoundersPage;
