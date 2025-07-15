import React from 'react'
import styles from './Question.module.css';

function Question({questionText}) { 
  return (
    <div className={styles.wrapper}>
      <p className={styles["question-text"]}>{questionText}</p>
    </div>
    
  );
}

export default Question;