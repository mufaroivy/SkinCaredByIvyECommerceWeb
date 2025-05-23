import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // We'll create this context soon
import styles from './LoginPage.module.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Hook to access login function from context
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(email, password); // Call the login function from the context
      navigate('/welcome'); // Redirect to welcome page on success
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Login</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        <button type="submit" className={styles.loginButton}>Login</button>
      </form>
      <p className={styles.registerLink}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default LoginPage;