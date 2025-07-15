import React from 'react';
import Button from '../Button/Button';
import styles from './WelcomeMessage.module.css';

function WelcomeMessage({ onShowFlashcardDeck}) { 
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Welcome to Duckling 🐥</h1>
      <h3 className={styles.tagline}>Ready to start studying?</h3>
      <Button
        onClick={onShowFlashcardDeck}
        buttonClass={"default-btn"}
      >
        Start    
      </Button>
    </div>
  );
}

export default WelcomeMessage;