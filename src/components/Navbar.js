import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import placeholderLogo from '../assets/skincarelogo.webp'; // Import your logo
import { GiHamburgerMenu } from 'react-icons/gi'; // Import hamburger icon
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

function Navbar() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isAuthenticated, getLoggedInUser } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);
    const mobileMenuRef = useRef(null); // NEW: Ref for the mobile menu itself
    const hamburgerRef = useRef(null); // NEW: Ref for the hamburger icon

    const toggleDropdown = () => {
        setDropdownVisible(prev => !prev); // Toggle based on previous state
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(prev => !prev); // Toggle based on previous state
        setDropdownVisible(false); // Close desktop dropdown when mobile menu opens/closes
    };

    const closeDropdown = () => {
        setDropdownVisible(false);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    // NEW: Helper to close both menus after a navigation click
    const handleNavLinkClick = () => {
        closeDropdown();
        closeMobileMenu();
    };

    const handleCartClick = () => {
        handleNavLinkClick(); // Close menus on cart click
        if (isAuthenticated()) {
            navigate('/cart');
        } else {
            alert('Please log in or register to view your cart.'); // Consider replacing with a custom modal
            navigate('/login');
        }
    };

    const getInitials = () => {
        const user = getLoggedInUser();
        if (user && user.firstName) {
            return user.firstName.charAt(0).toUpperCase();
        }
        return null;
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close desktop dropdown if click is outside dropdown and dropdown is visible
            if (dropdownVisible && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }

            // Close mobile menu if click is outside mobile menu AND not on the hamburger icon
            if (mobileMenuOpen && mobileMenuRef.current && hamburgerRef.current &&
                !mobileMenuRef.current.contains(event.target) &&
                !hamburgerRef.current.contains(event.target)) {
                closeMobileMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownVisible, mobileMenuOpen]); // Dependencies for useEffect

    useEffect(() => {
        // Close both menus on route change
        closeDropdown();
        closeMobileMenu();
    }, [location]); // Re-run when location changes

    return (
        <nav className={styles.navbar}>
            <div className={styles.brandContainer}>
                <img src={placeholderLogo} alt="SkinCaredByIvy Logo" className={styles.logo} />
                <Link to="/" className={styles.brand} onClick={handleNavLinkClick}>SkinCaredByIvy</Link>
            </div>

            <div className={styles.navLinks}>
                <div className={`${styles.navItem} ${styles.dropdown}`} ref={dropdownRef}>
                    <button onClick={toggleDropdown} className={styles.dropdownToggle}>
                        Skin Types
                    </button>
                    <div className={`${styles.dropdownMenu} ${dropdownVisible ? styles.show : ''}`} aria-labelledby="navbarDropdown">
                        {/* MODIFIED: Changed 'to' prop to point to root path with hash for cross-page navigation */}
                        <Link to="/#all" className={styles.dropdownItem} onClick={handleNavLinkClick}>All</Link> {/* Assuming 'all' is a section ID or just root */}
                        <Link to="/#oily" className={styles.dropdownItem} onClick={handleNavLinkClick}>Oily</Link>
                        <Link to="/#dry" className={styles.dropdownItem} onClick={handleNavLinkClick}>Dry</Link>
                        <Link to="/#combination" className={styles.dropdownItem} onClick={handleNavLinkClick}>Combination</Link>
                        <Link to="/#normal" className={styles.dropdownItem} onClick={handleNavLinkClick}>Normal</Link>
                    </div>
                </div>
                <Link to="/skin-issues" className={styles.navItem + ' ' + styles.navLink} onClick={handleNavLinkClick}>Skin Issues</Link>
                <Link to="/discover" className={styles.navItem + ' ' + styles.navLink} onClick={handleNavLinkClick}>Discover Your Skin Type</Link>
                <div className={styles.cartIconContainer} onClick={handleCartClick}>
                    <span role="img" aria-label="cart" style={{ fontSize: '1.2rem' }}>🛒</span>
                    {cart.length > 0 && <span className={styles.cartCount}>{cart.length}</span>}
                </div>
                <Link to="/customer-service" className={styles.navItem + ' ' + styles.navLink} onClick={handleNavLinkClick}>Customer Service</Link>
                <Link to="/contact" className={styles.navItem + ' ' + styles.navLink} onClick={handleNavLinkClick}>Contact Us</Link>
                {isAuthenticated() ? (
                    <div className={styles.userIconContainer}>
                        <Link to="/account" className={styles.userInitialCircle} onClick={handleNavLinkClick}>{getInitials()}</Link>
                    </div>
                ) : (
                    <Link to="/login" className={styles.navItem + ' ' + styles.navLink} onClick={handleNavLinkClick}>Login/Register</Link>
                )}
            </div>

            <div className={styles.hamburger} onClick={toggleMobileMenu} ref={hamburgerRef}> {/* NEW: Added ref */}
                <GiHamburgerMenu />
            </div>

            <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`} ref={mobileMenuRef}> {/* NEW: Added ref */}
                <button onClick={toggleDropdown} className={styles.mobileMenuItem}>
                    Skin Types
                </button>
                {dropdownVisible && (
                    <div className={styles.mobileSubMenu}>
                        {/* MODIFIED: Changed 'to' prop for mobile menu links to absolute path with hash */}
                        <Link to="/#all" className={styles.mobileSubMenuItem} onClick={handleNavLinkClick}>All</Link>
                        <Link to="/#oily" className={styles.mobileSubMenuItem} onClick={handleNavLinkClick}>Oily</Link>
                        <Link to="/#dry" className={styles.mobileSubMenuItem} onClick={handleNavLinkClick}>Dry</Link>
                        <Link to="/#combination" className={styles.mobileSubMenuItem} onClick={handleNavLinkClick}>Combination</Link>
                        <Link to="/#normal" className={styles.mobileSubMenuItem} onClick={handleNavLinkClick}>Normal</Link>
                    </div>
                )}
                <Link to="/skin-issues" className={styles.mobileMenuItem} onClick={handleNavLinkClick}>Skin Issues</Link>
                <Link to="/discover" className={styles.mobileMenuItem} onClick={handleNavLinkClick}>Discover Your Skin Type</Link>
                <div className={styles.mobileMenuItem} onClick={handleCartClick}> {/* handleCartClick already calls handleNavLinkClick */}
                    Cart ({cart.length})
                </div>
                <Link to="/customer-service" className={styles.mobileMenuItem} onClick={handleNavLinkClick}>Customer Service</Link>
                <Link to="/contact" className={styles.mobileMenuItem} onClick={handleNavLinkClick}>Contact Us</Link>
                {isAuthenticated() ? (
                    <Link to="/account" className={styles.mobileMenuItem} onClick={handleNavLinkClick}>Account ({getInitials()})</Link>
                ) : (
                    <Link to="/login" className={styles.mobileMenuItem} onClick={handleNavLinkClick}>Login/Register</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
