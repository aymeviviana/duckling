import React from 'react';
import styles from './DeckEmptyMessage.module.css';

function DeckEmptyMessage({ }) { 
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Flashcard Deck is Empty</h1>
      <h3 className={styles.tagline}>Click <span className={styles.bold}>Add</span> to create a new flashcard</h3>
    </div>
  );
}

export default DeckEmptyMessage;

