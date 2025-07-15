import React from 'react';
import styles from './FlashcardForm.module.css'
import Button from '../Button/Button';
import { ENDPOINT } from '../../constants';
import DataRequestError from '../DataRequestError/DataRequestError';
import { NO_ERROR } from '../../constants';

function FlashcardForm({ method, flashcard, onSubmitFlashcard, onHideForm, children}) { 
  const [currentFlashcard, setCurrentFlashcard] = React.useState(flashcard);
  const [error, setError] = React.useState(NO_ERROR);

  React.useEffect(() => { 
    setCurrentFlashcard(flashcard);
  }, [flashcard]);
  
  async function handleSubmitFlashcard(event) { 
    event.preventDefault();

    const endpoint = method === "POST" ? ENDPOINT : `${ENDPOINT}/${currentFlashcard._id}`;

    try {
      const response = await fetch(endpoint, {
        method,
        body: JSON.stringify(currentFlashcard),
        headers: {"Content-Type": "application/json; charset=utf-8"},
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(`${json.message}`);
      }

      onSubmitFlashcard(json, method);
      onHideForm();
      setError(NO_ERROR);
    } catch (error) {
      console.log(error.message);
      setError({status: true, message: error.message});
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmitFlashcard}
    >
      {error.status &&
        <DataRequestError
          message={error.message}
        />}
      <h2 className={styles.header}>
        { children }
      </h2>

      <figure className={styles["form-group"]}>
        <label
          htmlFor="question"
        >
          Question:
        </label>
        <textarea
          className={styles["question-text-area"]}
          type="text"
          id="question"
          name="question"
          value={currentFlashcard.question}
          onChange={(event) => { 
            const nextFlashcard = {...currentFlashcard, question: event.target.value};
            setCurrentFlashcard(nextFlashcard);
          }}
        />
      </figure>
      

      <figure className={styles["form-group"]}>
        <label
          htmlFor="answer"
        >
          Answer:
        </label>
        <textarea
          className={styles["answer-text-area"]}
          type="text"
          id="answer"
          name="answer"
          value={currentFlashcard.answer}
          onChange={(event) => { 
            const nextFlashcard = { ...currentFlashcard, answer: event.target.value };
            setCurrentFlashcard(nextFlashcard);
          }}
        />
      </figure>
      
      <figure className={styles["btn-group"]}>
        <input
          type="submit"
          value="Save"
          className={styles.submit}
        />

        <input
          type="button"
          value="Cancel"
          onClick={onHideForm}
          className={styles.cancel}
        />
      </figure>
    </form>
  );
}

export default FlashcardForm;