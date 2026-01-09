import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from './src/components/shared/Layout';
import './CreateAccount.css';

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: hook up to your API (/api/register) here
  };

  return (
    <Layout className="centered">
      <div className="signup-container">
        <div className="brand-logo">Joy Juncture</div>
        
        <div className="signup-form-wrapper">
          <h2>Create Account</h2>
          <p className="subtitle">Where games become memories.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullname" className="form-label">Full Name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                className="form-input"
                placeholder="John Doe"
                required
                autoComplete="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="name@company.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="form-input"
                  placeholder="Min. 8 characters"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
              <div className="input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirm_password"
                  name="confirm_password"
                  className="form-input"
                  placeholder="Re-enter password"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="checkbox-wrapper">
              <input type="checkbox" required id="terms" />
              <span>
                I agree to the <a href="#">Terms & Conditions</a>
              </span>
            </div>

            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>

          <div className="footer-text">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateAccount;