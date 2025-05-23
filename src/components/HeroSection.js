import React from 'react';
import styles from './HeroSection.module.css';
import heroImage from '../assets/skincarelogo.webp'; // Replace with your image

function HeroSection() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <h2 className={styles.heroSubtitle}>Embrace Your Natural Beauty</h2>
        <h1 className={styles.heroTitle}>Discover Skincare Tailored For You</h1>
        <p className={styles.heroDescription}>
          Explore a curated collection of skincare essentials designed to nourish, balance, and enhance your unique complexion. Find the perfect products for every skin type and concern.
        </p>
      </div>
      <img
        src={heroImage} // Replace with your actual hero image
        alt="Beautiful Skincare Products"
        className={styles.heroImage}
      />
    </div>
  );
}

export default HeroSection;