import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import SkinTypeSection from './components/SkinTypeSection';
import DiscoverSkinType from './components/DiscoverSkinType';
import ContactUs from './components/ContactUs';
import CustomerService from './components/CustomerService';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import SkinIssuesSection from './components/SkinIssuesSection';
import CartPage from './components/CartPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import WelcomePage from './components/WelcomePage';
import AccountPage from './components/AccountPage';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ScrollToTopButton from './components/ScrollToTopButton'; // Keep this import for the fixed button

// REMOVED: The old ScrollToTop component that scrolled on route change.
// This functionality is different from the fixed "Return to Top" button.
/*
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
*/

function AppContent() {
  const navbarRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleAnchorScroll = () => {
      const hash = window.location.hash;
      // MODIFIED: Use a setTimeout to allow the new page content to render
      // before attempting to scroll to the anchor. This helps with cross-page navigation.
      setTimeout(() => {
        if (hash) {
          const targetElement = document.querySelector(hash);
          if (targetElement) {
            const offsetTop = targetElement.offsetTop - navbarHeight;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth',
            });
          }
        } else if (location.pathname === '/') {
          // MODIFIED: If no hash, but we are on the root path, scroll to the very top.
          // This handles cases like clicking "All" or the logo from another page.
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
      }, 100); // A small delay (e.g., 100ms) often works well
    };

    // MODIFIED: Add location.pathname as a dependency.
    // This ensures the effect re-runs when the main route changes, not just the hash.
    handleAnchorScroll(); // Run on initial render to catch initial hash/path
    window.addEventListener('hashchange', handleAnchorScroll);

    return () => window.removeEventListener('hashchange', handleAnchorScroll);
  }, [navbarHeight, location.hash, location.pathname]); // MODIFIED: Added location.pathname to dependencies

  // Redirect to login if trying to access cart while not authenticated
  useEffect(() => {
    if (location.pathname === '/cart' && !isAuthenticated()) {
      // Using a custom alert/modal is recommended over window.alert()
      // For now, keeping window.alert() as per previous code, but consider replacing.
      alert('Please log in or register to view your cart.');
      navigate('/login');
    }
  }, [isAuthenticated, navigate, location.pathname]);

  return (
    <div style={{ position: 'relative' }}> {/* This div is for the fixed Navbar */}
      <Navbar ref={navbarRef} />
      <div style={{ paddingTop: `${navbarHeight}px` }}> {/* Prevents content from being hidden under the fixed Navbar */}
        {/* REMOVED: <ScrollToTop /> as it's replaced by the fixed ScrollToTopButton */}
        <Routes>
          <Route path="/" element={<>
            <HeroSection />
            {/* Ensure these sections have their corresponding IDs for anchor links to work */}
            <section id="oily"><SkinTypeSection skinType="Oily" /></section>
            <section id="dry"><SkinTypeSection skinType="Dry" /></section>
            <section id="combination"><SkinTypeSection skinType="Combination" /></section>
            <section id="normal"><SkinTypeSection skinType="Normal" /></section>
            <section id="discover"><DiscoverSkinType /></section>
            <section id="skin-issues"><SkinIssuesSection /></section>
          </>} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/customer-service" element={<CustomerService />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/skin-issues" element={<SkinIssuesSection />} />
          <Route path="/discover" element={<DiscoverSkinType />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
        <Footer companyName="SkinCaredByIvy" />
      </div>
      {/* NEW: Render the ScrollToTopButton here, outside the paddingTop div
          but still within the main app container. This makes it globally available
          and correctly positioned (fixed to viewport). */}
      <ScrollToTopButton />
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent /> {/* AppContent uses routing hooks, so it must be inside Router */}
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default AppWrapper;
