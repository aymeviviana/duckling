import React from 'react';
import styles from './Flashcard.module.css';
import Question from '../Question/Question';
import Answer from '../Answer/Answer';
import Button from '../Button/Button';

function Flashcard({ flashcard, isAnswerShowing, onShowAnswer, onHideAnswer}) { 
  return (
    <div className={styles.wrapper}>
      <Question
        questionText={flashcard.question}
      />

      {isAnswerShowing &&
        <>
        <Button
          onClick={onHideAnswer}
          buttonClass={"default-btn"}
        >
            Hide Answer
          </Button>  
          <Answer
            answerText={flashcard.answer}
          />
        </>}
    
      {!isAnswerShowing &&
        <Button
          onClick={onShowAnswer}
          buttonClass={"default-btn"}
        >
          Show Answer
        </Button>}  
    </div>
  );
}

export default Flashcard;