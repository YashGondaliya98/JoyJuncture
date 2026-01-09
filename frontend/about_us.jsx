import React from 'react';
import Layout from './src/components/shared/Layout';
import './about_us.css';

function AboutPage() {
  return (
    <Layout className="full-width">
      <section className="about-section">
        <div className="container">
          <h1>We Don't Just Make Games. We Spark Connections.</h1>
          <p className="hero-text">
            At Joy Juncture, we believe life is too short for boring evenings and awkward silences.
            We're an Indian gaming studio dedicated to bringing people back to the table.
          </p>

          <div className="grid grid-3 mt-xl">
            <div className="card">
              <h3>The Vibe</h3>
              <p>
                We create experiences that turn friends into co-conspirators and strangers into stories you'll never forget.
              </p>
            </div>

            <div className="card">
              <h3>Our Philosophy</h3>
              <p>
                Connection over competition, aesthetics that feel premium, and games that are easy to learn but hard to stop playing.
              </p>
            </div>

            <div className="card">
              <h3>Why Joy Juncture?</h3>
              <p>
                Because the best stories happen when you gather your favorite people, open a box, and let the chaos begin.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default AboutPage;
