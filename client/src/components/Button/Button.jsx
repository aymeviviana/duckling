import React from 'react';
import styles from './Button.module.css';

function Button({ onClick, buttonClass, children, disabled = false }) { 
  return (
    <button className={`${styles[buttonClass]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;