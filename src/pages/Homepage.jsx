import React, { useState, useRef } from "react";
import "../css/Homepage.css";
import ReCAPTCHA from "react-google-recaptcha";

export default function HomePage() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [recaptcha, setRecaptcha] = useState(null);
  const recaptchaRef = useRef(null);
  const [isSwitching, setIsSwitching] = useState(false);

  const [signinForm, setSigninForm] = useState({
    username: "",
    password: ""
  });

  const [signupForm, setSignupForm] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
  });

  const [errors, setErrors] = useState({
    signin: "",
    signup: ""
  });

  const handleSigninChange = (e) => {
    setSigninForm({ ...signinForm, [e.target.name]: e.target.value });
    setErrors({ ...errors, signin: "" });
  };

  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
    setErrors({ ...errors, signup: "" });
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  };

  const handleSigninSubmit = (e) => {
    e.preventDefault();
    if (!recaptcha) {
      setErrors({ ...errors, signin: "Please complete the reCAPTCHA" });
      return;
    }
    alert("Signin Successful!");
    setShowSignIn(false);
    setSigninForm({ username: "", password: "" });
    setRecaptcha(null);
    setErrors({ ...errors, signin: "" });
    recaptchaRef.current?.reset();
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword, age } = signupForm;

    if (!validatePassword(password)) {
      setErrors({ ...errors, signup: "Password must include uppercase, lowercase, number, and special character" });
      return;
    }
    if (password !== confirmPassword) {
      setErrors({ ...errors, signup: "Passwords do not match" });
      return;
    }
    if (Number(age) <= 18) {
      setErrors({ ...errors, signup: "Age must be greater than 18" });
      return;
    }

    alert("Signup Successful!");
    setShowSignUp(false);
    setSignupForm({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      age: "",
      gender: "",
    });
    setErrors({ ...errors, signup: "" });
  };

  const switchToSignup = () => {
    setIsSwitching(true);
    setTimeout(() => {
      setShowSignIn(false);
      setShowSignUp(true);
      setIsSwitching(false);
    }, 300);
  };

  const switchToSignin = () => {
    setIsSwitching(true);
    setTimeout(() => {
      setShowSignUp(false);
      setShowSignIn(true);
      setIsSwitching(false);
    }, 300);
  };

  return (
    <div className="homepage">
      <header className="header">
        <div className="logo">
          <img src="/path/to/logo.png" alt="Logo" />
        </div>
        <nav className="nav-links">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Contact Us</a>
          <a href="#" className="nav-link">Rules</a>
          <a href="#" className="nav-link">FAQ</a>
          <button className="auth-button" onClick={() => setShowSignIn(true)}>
            Sign In
          </button>
        </nav>
      </header>

      <main className="main-content">
        <h1 className="title">Random Video Call</h1>
        <p className="subtitle">Chat with strangers instantly</p>
        <p className="description">
          Connect with people from around the world. Just click 'Start' to begin a video chat.
        </p>
        <button className="start-button">Start Video</button>
      </main>

      <footer className="footer">
        <div className="footer-links">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
        </div>
      </footer>

      {/* Sign In Modal */}
      {showSignIn && (
        <div className={`modal-overlay ${isSwitching ? 'switching' : ''}`}>
          <div className={`modal ${isSwitching ? 'fade-out' : 'fade-in'}`}>
            <button
              className="modal-close"
              onClick={() => {
                setShowSignIn(false);
                setSigninForm({ username: "", password: "" });
                setRecaptcha(null);
                setErrors({ ...errors, signin: "" });
                recaptchaRef.current?.reset();
              }}
            >
              ×
            </button>
            <div className="auth-container">
              <div className="auth-left">
                <h2>Welcome Back!</h2>
                <p>Enter your personal details to use all features.</p>
                <button 
                  onClick={switchToSignup} 
                  className="auth-switch-btn"
                >
                  SIGN UP
                </button>
              </div>
              <div className="auth-right">
                <h2>Let's Reconnect</h2>
                <form onSubmit={handleSigninSubmit} className="auth-form">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={signinForm.username}
                    onChange={handleSigninChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={signinForm.password}
                    onChange={handleSigninChange}
                    required
                  />
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LdHUDMqAAAAAF7Scqi5mztQo1RUFcUNxVgiHyuo"
                    onChange={setRecaptcha}
                    className="recaptcha"
                  />
                  {errors.signin && <div className="error-message">{errors.signin}</div>}
                  <button type="submit" className="auth-submit-btn" disabled={!recaptcha}>
                    SIGN IN
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignUp && (
        <div className={`modal-overlay ${isSwitching ? 'switching' : ''}`}>
          <div className={`modal signup-container ${isSwitching ? 'fade-out' : 'fade-in'}`}>
            <button
              className="modal-close"
              onClick={() => {
                setShowSignUp(false);
                setSignupForm({
                  fullName: "",
                  username: "",
                  password: "",
                  confirmPassword: "",
                  age: "",
                  gender: "",
                });
                setErrors({ ...errors, signup: "" });
              }}
            >
              ×
            </button>
            <div className="auth-container">
              <div className="auth-right">
                <h2>Say Hello to the World</h2>
                <form onSubmit={handleSignupSubmit} className="auth-form">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={signupForm.fullName}
                    onChange={handleSignupChange}
                    required
                  />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={signupForm.username}
                    onChange={handleSignupChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={signupForm.password}
                    onChange={handleSignupChange}
                    required
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={signupForm.confirmPassword}
                    onChange={handleSignupChange}
                    required
                  />
                  <div className="row-fields">
                    <input
                      type="number"
                      name="age"
                      placeholder="Age"
                      value={signupForm.age}
                      onChange={handleSignupChange}
                      required
                      min="1"
                    />
                    <select
                      name="gender"
                      value={signupForm.gender}
                      onChange={handleSignupChange}
                      required
                    >
                      <option value="">Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {errors.signup && <div className="error-message">{errors.signup}</div>}
                  <button type="submit" className="auth-submit-btn">
                    SIGN UP
                  </button>
                </form>
              </div>
              <div className="auth-left">
                <h2>Hello, Friend!</h2>
                <p>Enter your personal details to start your journey with us</p>
                <button 
                  onClick={switchToSignin} 
                  className="auth-switch-btn"
                >
                  SIGN IN
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}