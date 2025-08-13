import React from "react";
import { Link } from "react-router-dom";
import Logo from '../assets/logo.png'

const Register = () => {
  return (
    <div className="login-page">
      <img className="userCredLogo" src={Logo} alt="logo" />
      <div className="login-box">
        <h2>Register</h2>
        <form className="userF">
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p className="register-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
