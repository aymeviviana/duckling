import React from "react";
import styles from "./DeckNotLoadingError.module.css";
import Button from "../Button/Button";

function DeckNotLoadingError({ handleFetchFlashcardDeck}) { 
  return (
    <div>
      <h1 className={styles.header}>Oops! Something went wrong 🙊</h1>
      <h3 className={styles.tagline}>Please try again</h3>

      <Button
        onClick={handleFetchFlashcardDeck}
        buttonClass={"default-btn"}
      >
        Try Again!
      </Button>
    </div>
  );
}

export default DeckNotLoadingError;