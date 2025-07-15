import React from 'react';
import styles from './Answer.module.css';
import { formatAnswer } from '../../utils/answerHelpers';

function Answer({ answerText }) { 
  const paragraphs = formatAnswer(answerText);

  return (
    <div className={styles.wrapper}>
      
      {paragraphs.map(paragraph => (
        <>
          <p>{paragraph}</p>
          <br />
        </>
      ))}
    </div>
  );
}

export default Answer;