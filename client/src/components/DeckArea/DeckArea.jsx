import React from "react";
import styles from "./DeckArea.module.css";
import useFlashcards from "../../hooks/useFlashcards";
import DeckNotLoadingError from "../DeckNotLoadingError/DeckNotLoadingError";
import Deck from "../Deck/Deck";

function DeckArea({}) { 
  const [
    flashcardDeck,
    flashcardIndex,
    isEndOfDeck,
    isDeckEmpty,
    isAnswerShowing,
    handleFetchFlashcardDeck,
    handleDisplayNextFlashcard,
    handleDisplayPreviousFlashcard,
    handleShowAnswer,
    handleHideAnswer,
    handleSubmitFlashcard,
    handleSubmitDeleteFlashcard,
    handleRestartDeck,
    error] = useFlashcards();
  
  return (
    <>
      {error.status
        ? <DeckNotLoadingError
            handleFetchFlashcardDeck={handleFetchFlashcardDeck}
          />
        : <Deck
            flashcardDeck={flashcardDeck}
            flashcardIndex={flashcardIndex}
            isEndOfDeck={isEndOfDeck}
            isDeckEmpty={isDeckEmpty}
            isAnswerShowing={isAnswerShowing}
            onDisplayNextFlashcard={handleDisplayNextFlashcard}
            onDisplayPreviousFlashcard={handleDisplayPreviousFlashcard}
            onShowAnswer={handleShowAnswer}
            onHideAnswer={handleHideAnswer}
            onSubmitFlashcard={handleSubmitFlashcard}
            onSubmitDeleteFlashcard={handleSubmitDeleteFlashcard}
            onRestartDeck={handleRestartDeck}
        />}
      </>
  );
}

export default DeckArea;