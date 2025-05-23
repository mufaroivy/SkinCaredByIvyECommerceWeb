import React from 'react';

export const Button = ({ children, className = '', ...props }) => {
  return (
    <button className={`custom-button ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
