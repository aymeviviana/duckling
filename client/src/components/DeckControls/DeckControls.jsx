import React from 'react';
import Button from '../Button/Button';
import styles from './DeckControls.module.css';

function DeckControls({
  isDeckEmpty,
  onShowAddForm,
  onShowEditForm,
  onShowDeleteForm,
  onDisplayPreviousFlashcard,
  onDisplayNextFlashcard,
  flashcardIndex
}) { 
  
  return (
    <div className={styles.wrapper}>
      <div className={styles["update-btn-group"]}>
        <Button
          onClick={onShowAddForm}
          buttonClass={"update-btn"}
        >Add
        </Button>

        <Button
          onClick={onShowEditForm}
          buttonClass={"update-btn"}
          disabled={ isDeckEmpty}
        >Edit
        </Button>

        <Button
          onClick={onShowDeleteForm}
          buttonClass={"update-btn"}
          disabled={ isDeckEmpty}
        >Delete
        </Button>
      </div>

      <div className={styles["nav-btn-group"]}>
        <Button
          onClick={onDisplayPreviousFlashcard}
          buttonClass={"nav-btn"}
          disabled={ isDeckEmpty || flashcardIndex < 1}
        >Previous
        </Button>

        <Button
          onClick={onDisplayNextFlashcard}
          buttonClass={"nav-btn"}
          disabled={ isDeckEmpty}
        >Next
        </Button>
      </div>
    </div>
  );
}

export default DeckControls;