import React, { useState } from 'react';
import styles from './ContactUs.module.css'; // Create a new CSS module for this page

// Import icons (you'll need to install a library like react-icons: npm install react-icons)
import { FaTiktok, FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    const subject = 'Contact Us Inquiry from Website';
    const body = `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`;
    const mailtoLink = `mailto:mufaromuzunze7@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
    alert('Opening your email client...');

    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentBlock}>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Reach out through our social media channels or send us a message using the form below.</p>

        <section className={styles.socialMediaSection}>
          <h2>Connect With Us</h2>
          <div className={styles.socialIcons}>
            <a href="https://www.tiktok.com/@mufaro.faith" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaTiktok className={styles.socialIcon} />
              <span className={styles.socialUsername}>@mufaro.faith</span>
            </a>
            <a href="https://www.instagram.com/mufaro.faith" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaInstagram className={styles.socialIcon} />
              <span className={styles.socialUsername}>@mufaro.faith</span>
            </a>
            <a href="mailto:mufaromuzunze7@gmail.com" className={styles.socialLink}>
              <FaEnvelope className={styles.socialIcon} />
              <span className={styles.socialUsername}>mufaromuzunze7@gmail.com</span>
            </a>
            <a href="https://www.facebook.com/Mufaro-Muzunze-10xxxxxxxxxxxxx" target="_blank" rel="noopener noreferrer" className={styles.socialLink}> {/* Replace with actual Facebook link/ID */}
              <FaFacebook className={styles.socialIcon} />
              <span className={styles.socialUsername}>Mufaro Muzunze</span>
            </a>
          </div>
        </section>

        <section className={styles.contactFormSection}>
          <h2>Send Us a Message</h2>
          <p>If you have any questions or need further assistance, please fill out the form below and we'll get back to you as soon as possible.</p>
          <form onSubmit={handleSubmit}>
            <p>
              Name:
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className={styles.inputField}
                required
              />
            </p>
            <p>
              Email:
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={styles.inputField}
                required
              />
              {emailError && <p className={styles.errorMessage}>{emailError}</p>}
            </p>
            <p>
              Message:
              <textarea
                value={message}
                onChange={handleMessageChange}
                className={styles.textareaField}
                rows="5"
                required
              />
            </p>
            <button type="submit" className={styles.submitButton}>Send Email</button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default ContactUs;