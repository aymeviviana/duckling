import React from 'react';
import styles from './DeleteFlashcardForm.module.css';
import Button from '../Button/Button';
import { ENDPOINT } from '../../constants';
import DataRequestError from '../DataRequestError/DataRequestError';
import { NO_ERROR } from '../../constants';
import { METHOD_DELETE } from '../../constants';
import { shortenedText } from '../../utils/deleteFlashcardHelpers';


function DeleteFlashcardForm({ flashcard, onHideDeleteForm, onDeleteFlashcard }) { 
  const [error, setError] = React.useState(NO_ERROR);

  
  
  async function handleSubmitDeleteFlashcard(event) { 
    event.preventDefault();

    try {
      const response = await fetch(`${ENDPOINT}/${flashcard._id}`, {
        method: METHOD_DELETE,
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(`${json.message}`);
      }

      onDeleteFlashcard(json._id);
      onHideDeleteForm();
      setError(NO_ERROR);
    } catch (error) {
      console.log(error.message);
      setError({status: true, message: error.message});
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmitDeleteFlashcard}
    >
      {error.status &&
        <DataRequestError
        message={error.message}
        />}
      <h2 className={styles.header}>
        Are you sure?
      </h2>

      <h3 className={styles.tagline}>Please confirm that you want to delete this flashcard</h3>

      <p className={styles["question-text"]}>{`"${shortenedText(flashcard.question, 80)}"`}</p>
  
     <figure className={styles["btn-group"]}>
      <input
        type="submit"
        value="Yes, Delete!"
        className={styles.submit}
      />

      <input
        type="button"
        value="Cancel"
        onClick={onHideDeleteForm}
        className={styles.cancel}
      />
    </figure>
    </form>
  );
}

export default DeleteFlashcardForm;