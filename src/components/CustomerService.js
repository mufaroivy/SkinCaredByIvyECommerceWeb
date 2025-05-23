import React, { useState } from 'react';
import styles from './CustomerService.module.css';

function CustomerService() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(''); // Clear error on input
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

    const subject = 'Customer Service Inquiry from Website';
    const body = `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`;
    const mailtoLink = `mailto:support@skincaredbyivy.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
    alert('Opening your email client...');

    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentBlock}>
        <h1>Customer Service</h1>
        <p>We're here to help! Browse our FAQs or send us a message below.</p>

        <section className={styles.faqSection}>
          <h2>Frequently Asked Questions</h2>
          <div className={styles.faqItem}>
            <p className={styles.question}>**Q: What is your shipping policy?**</p>
            <p className={styles.answer}>A: We offer shipping within Zimbabwe and internationally. Shipping costs and delivery times vary depending on your location. Please see our detailed shipping policy for more information.</p>
          </div>
          <div className={styles.faqItem}>
            <p className={styles.question}>**Q: What is your return policy?**</p>
            <p className={styles.answer}>A: We accept returns within 30 days of purchase for unopened and unused products. Please review our full return policy for details on how to initiate a return.</p>
          </div>
          <div className={styles.faqItem}>
            <p className={styles.question}>**Q: How do I track my order?**</p>
            <p className={styles.answer}>A: Once your order ships, you will receive an email with a tracking number and a link to track your package on the carrier's website.</p>
          </div>
          <div className={styles.faqItem}>
            <p className={styles.question}>**Q: What payment methods do you accept?**</p>
            <p className={styles.answer}>A: We accept major credit cards (Visa, MasterCard, American Express), mobile money (Ecocash, OneMoney), and bank transfers. All transactions are secure and encrypted.</p>
          </div>
          <div className={styles.faqItem}>
            <p className={styles.question}>**Q: Are your products cruelty-free?**</p>
            <p className={styles.answer}>A: Yes, we are proud to say that all our products are cruelty-free and not tested on animals.</p>
          </div>
        </section>

        <section className={styles.policiesSection}>
          <h2>Our Policies</h2>
          <div className={styles.policyItem}>
            <h3>Returns Policy</h3>
            <p>We want you to be completely satisfied with your purchase. If you are not entirely happy with your order, we offer returns within 30 days of receiving your products, provided they are unopened, unused, and in their original packaging. To initiate a return, please contact our customer service team with your order number and reason for the return. We will provide you with instructions on how to send the product back. Once we receive the returned item and verify its condition, we will process your refund or exchange. Please note that shipping costs for returns may apply unless the return is due to a defect or an error on our part.</p>
          </div>
          <div className={styles.policyItem}>
            <h3>Shipping Policy</h3>
            <p>We are committed to delivering your skincare products in a timely and efficient manner. We offer shipping within Zimbabwe and to select international destinations. Shipping costs are calculated based on your location and the weight of your order. Estimated delivery times will be provided at checkout. Please note that these are estimates and actual delivery times may vary due to factors beyond our control, such as customs delays for international orders. Once your order has been processed and shipped, you will receive a confirmation email with a tracking number to monitor your delivery progress.</p>
          </div>
          <div className={styles.policyItem}>
            <h3>Privacy Policy</h3>
            <p>Your privacy is important to us. We are committed to protecting your personal information. Our privacy policy outlines the types of information we collect, how we use it, and the measures we take to ensure its security. We will never share your personal information with third parties for marketing purposes without your explicit consent. By using our website, you agree to the terms of our privacy policy. Please take the time to read our full privacy policy to understand how we handle your data.</p>
          </div>
          <div className={styles.policyItem}>
            <h3>Terms of Service</h3>
            <p>By accessing and using our website, you agree to comply with our terms of service. These terms govern your use of our website, including product purchases, account registration, and interaction with our content. Please read our terms of service carefully before using our website. We reserve the right to update these terms at any time, and your continued use of the website after any changes constitutes your acceptance of the revised terms.</p>
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

export default CustomerService;