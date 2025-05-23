import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './WelcomePage.module.css';

function WelcomePage() {
  const { getLoggedInUser } = useAuth();
  const navigate = useNavigate();
  const [userFirstName, setUserFirstName] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const user = getLoggedInUser();
    if (user) {
      setUserFirstName(user.firstName);
      setShowAnimation(true);
    } else {
      navigate('/login'); // Redirect if no logged-in user
    }
  }, [getLoggedInUser, navigate]);

  const handleGetIntoAccount = () => {
    navigate('/'); // Navigate to the home page (main page)
  };

  return (
    <div className={styles.welcomeContainer}>
      {showAnimation && (
        <div className={styles.welcomeMessage}>
          <h1>Welcome, <span className={styles.firstName}>{userFirstName}!</span></h1>
          <p>Get ready to explore our amazing skincare products.</p>
          <button onClick={handleGetIntoAccount} className={styles.enterButton}>
            Get into your Account
          </button>
        </div>
      )}
    </div>
  );
}

export default WelcomePage;