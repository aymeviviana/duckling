import React from 'react';
import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';
import DeckArea from '../DeckArea/DeckArea';
import styles from './App.module.css';

function App() {
  const [isFlashcardDeckActive, setIsFlashcardDeckActive] = React.useState(false);
  
  const handleShowFlashcardDeck = () => setIsFlashcardDeckActive(true);

  return (
    <main className={styles.mainWrapper}>
      <section className={styles.sectionWrapper}>
      {isFlashcardDeckActive 
        ? <DeckArea />
        : <WelcomeMessage
          onShowFlashcardDeck={handleShowFlashcardDeck}
          />}
      </section>
    </main>
  );
}

export default App
