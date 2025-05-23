import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { CartProvider } from './contexts/CartContext'; // Import CartProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider> {/* Wrap App with CartProvider */}
      <App />
    </CartProvider>
  </React.StrictMode>
);