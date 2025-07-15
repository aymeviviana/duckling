import React from 'react';
import Button from '../Button/Button';
import styles from './EndOfDeckMessage.module.css';

function EndOfDeckMessage({ onRestartDeck }) { 
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.header}>Congratulations! <br /> You finished!</h2>
      <h3 className={styles.tagline}>Wanna study again?</h3>
      <Button
        onClick={onRestartDeck}
        buttonClass={"default-btn"}
      >
        Start Over
      </Button>
    </div>
  );
}

export default EndOfDeckMessage;

