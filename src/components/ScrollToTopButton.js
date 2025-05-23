import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // Import the arrow icon
import styles from './ScrollToTopButton.module.css'; // Import its dedicated CSS module

const ScrollToTopButton = () => {
    const [showButton, setShowButton] = useState(false);

    // Effect to handle scroll event for button visibility
    useEffect(() => {
        const handleScroll = () => {
            // Show button if scrolled more than 300px down
            if (window.scrollY > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        // Add scroll event listener when component mounts
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

    // Function to smoothly scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll animation
        });
    };

    // Render the button only if showButton is true
    return (
        <>
            {showButton && (
                <button
                    onClick={scrollToTop}
                    className={styles.scrollToTopButton}
                    aria-label="Scroll to top" // Accessibility improvement
                >
                    <FaArrowUp />
                </button>
            )}
        </>
    );
};

export default ScrollToTopButton;
