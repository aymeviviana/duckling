import React from 'react';
import styles from './Deck.module.css';
import DeckControls from '../DeckControls/DeckControls';
import Flashcard from '../Flashcard/Flashcard';
import FlashcardForm from '../FlashcardForm/FlashcardForm';
import Modal from '../Modal/Modal';
import EndOfDeckMessage from '../EndOfDeckMessage/EndOfDeckMessage';
import DeleteFlashcardForm from '../DeleteFlashcardForm/DeleteFlashcardForm';
import DeckEmptyMessage from '../DeckEmptyMessage/DeckEmptyMessage';
import { EMPTY_FLASHCARD } from '../../constants';

function Deck({ 
  flashcardDeck,
  flashcardIndex,
  isEndOfDeck,
  isDeckEmpty,
  isAnswerShowing,
  onDisplayNextFlashcard,
  onDisplayPreviousFlashcard,
  onShowAnswer,
  onHideAnswer,
  onSubmitFlashcard,
  onSubmitDeleteFlashcard,
  onRestartDeck }) {
  
  const [isAddFlashcardForm, setIsAddFlashcardForm] = React.useState(false);
  const [isEditFlashcardForm, setIsEditFlashcardForm] = React.useState(false);
  const [isDeleteFlashcardForm, setIsDeleteFlashcardForm] = React.useState(false);

  const currentFlashcard = flashcardDeck[flashcardIndex] || { question: "", answer: "" };

  const handleShowAddForm = () => setIsAddFlashcardForm(true);
  const handleHideAddForm = () => setIsAddFlashcardForm(false);

  const handleShowEditForm = () => setIsEditFlashcardForm(true);
  const handleHideEditForm = () => setIsEditFlashcardForm(false);

  const handleShowDeleteForm = () => setIsDeleteFlashcardForm(true);
  const handleHideDeleteForm = () => setIsDeleteFlashcardForm(false);
  
  return (
    <div className={styles.deck}>
      <DeckControls
        isDeckEmpty={isDeckEmpty}
        onShowAddForm={handleShowAddForm}
        onShowEditForm={handleShowEditForm}
        onShowDeleteForm={handleShowDeleteForm}
        onDisplayNextFlashcard={onDisplayNextFlashcard}
        onDisplayPreviousFlashcard={onDisplayPreviousFlashcard}
        flashcardIndex={flashcardIndex}
      />
      
      {isDeckEmpty
        ? <DeckEmptyMessage />
        : <Flashcard
            flashcard={currentFlashcard}
            isAnswerShowing={isAnswerShowing}
            onShowAnswer={onShowAnswer}
            onHideAnswer={onHideAnswer}
        />}
      
      {isAddFlashcardForm &&
        <Modal>
          <FlashcardForm
            method={"POST"}
            flashcard={EMPTY_FLASHCARD}
            onSubmitFlashcard={onSubmitFlashcard}
            onHideForm={handleHideAddForm}
          >
            Add Flashcard
          </FlashcardForm>
        </Modal>}
      
      {isEditFlashcardForm &&
        <Modal>
          <FlashcardForm
            method={"PUT"}
            flashcard={currentFlashcard}
            onSubmitFlashcard={onSubmitFlashcard}
            onHideForm={handleHideEditForm}
          >
            Edit Flashcard
          </FlashcardForm>
        </Modal>}
      
      {isDeleteFlashcardForm &&
        <Modal>
          <DeleteFlashcardForm
            flashcard={currentFlashcard}
            onDeleteFlashcard={onSubmitDeleteFlashcard}
            onHideDeleteForm={handleHideDeleteForm}
          />
        </Modal>}
      
      {isEndOfDeck &&
        <EndOfDeckMessage
          onRestartDeck={onRestartDeck}
        />}
    </div>
  );
}

export default Deck;