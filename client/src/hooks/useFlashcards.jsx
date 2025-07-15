import React from 'react';
import { shuffle } from '../utils/flashcardDeckHelpers';
import { ENDPOINT } from '../constants';
import { NO_ERROR } from '../constants';
import { METHOD_POST, METHOD_PUT } from '../constants';

function useFlashcards() { 
  const [flashcardDeck, setFlashcardDeck] = React.useState([]);
  const [flashcardIndex, setFlashcardIndex] = React.useState(0);
  const [isAnswerShowing, setIsAnswerShowing] = React.useState(false);
  const [isEndOfDeck, setIsEndOfDeck] = React.useState(false);
  const [isDeckEmpty, setIsDeckEmpty] = React.useState(false);
  const [error, setError] = React.useState(NO_ERROR);

  const handleShowAnswer = () => setIsAnswerShowing(true);
  const handleHideAnswer = () => setIsAnswerShowing(false);

  const handleSubmitFlashcard = (flashcard, method) => { 
      const nextFlashcardDeck = [...flashcardDeck];
  
      if (method === METHOD_POST) { 
        if (nextFlashcardDeck.length === 0) {
          nextFlashcardDeck.push(flashcard);
          setIsDeckEmpty(false);
        } else {
          nextFlashcardDeck.splice(flashcardIndex + 1, 0, flashcard);
          setFlashcardIndex(flashcardIndex + 1);
        }
      } else if (method === METHOD_PUT) {
        nextFlashcardDeck.splice(flashcardIndex, 1, flashcard);  
      }
  
      setFlashcardDeck(nextFlashcardDeck);
      handleHideAnswer();
    };
  
    const handleSubmitDeleteFlashcard = (id) => { 
      const nextFlashcardDeck = flashcardDeck.filter(flashcard => flashcard._id !== id);
      
      if (nextFlashcardDeck.length === 0) { 
        setIsDeckEmpty(true);
      }
      
      setFlashcardDeck(nextFlashcardDeck);
  
      if (flashcardIndex >= nextFlashcardDeck.length && flashcardIndex > 0) { 
        setFlashcardIndex(nextFlashcardDeck.length - 1);
      }
      handleHideAnswer();
    };
    
    async function handleFetchFlashcardDeck() { 
      try {
        const response = await fetch(ENDPOINT);
  
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
  
        const flashcards = await response.json();
  
        if (flashcards.length === 0) {
          setIsDeckEmpty(true);
        } else {
          shuffle(flashcards);
        }
  
        setFlashcardDeck(flashcards);
        setError(NO_ERROR);
      } catch (error) { 
        console.log(error.message); 
        setError({status: true, message: error.message});
      }
    }
  
    function handleDisplayNextFlashcard() { 
      handleHideAnswer();
      const nextFlashcardIndex = flashcardIndex + 1;
      
      if (nextFlashcardIndex >= flashcardDeck.length) { 
        return setIsEndOfDeck(true);
      }
      setFlashcardIndex(nextFlashcardIndex);
    }
  
    function handleDisplayPreviousFlashcard() { 
      handleHideAnswer();
      setFlashcardIndex(flashcardIndex - 1);
    }
  
    function handleRestartDeck() { 
      const shuffledDeck = shuffle(flashcardDeck);
      setFlashcardDeck(shuffledDeck);
      setFlashcardIndex(0);
      setIsEndOfDeck(false);
    }
  
    React.useEffect(() => { 
      handleFetchFlashcardDeck();
    }, []);
  
  return [
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
    error
  ];
}

export default useFlashcards;