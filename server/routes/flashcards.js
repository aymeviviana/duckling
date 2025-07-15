import express from 'express';
import db from '../db/conn.js';
import { ObjectId } from 'mongodb';
const router = express.Router();

// Get a list of all flashcards
router.get("/", async (req, res, next) => {
  const collection = db.collection("flashcards"); 
  
  try {
    const results = await collection.find({}).toArray();
    res.send(results).status(200);
  } catch (error) {
    return next(error);
  }
  
});

// Create a new flashcard
router.post('/', async (req, res, next) => { 
  const question = req.body.question.trim();
  const answer = req.body.answer.trim();

  if (question.length === 0 || answer.length === 0) { 
    const error = new Error("Question and Answer must contain at least one character");
    error.status = 400;
    return next(error);
  }

  const collection = db.collection("flashcards");

  try {
    const result = await collection.insertOne(req.body);
    
    if (!result.acknowledged) { 
      throw new Error(`Flashcard was not created. Please try again.`);
    }

    const flashcardId = result.insertedId;
    const query = { _id: flashcardId };
    const newFlashcard = await collection.findOne(query); 
    
    if (!newFlashcard) { 
      throw new Error(`Flashcard not found. Please try again.`);
    }

    res.send(newFlashcard).status(201);
  } catch (error) {
    return next(error);
  }
});

// Edit a flashcard
router.put('/:id', async (req, res, next) => { 
  const id = req.params.id;
  const question = req.body.question;
  const answer = req.body.answer;

  if (question.length === 0 || answer.length === 0) { 
    const error = new Error("Question and Answer must contain at least one character");
    error.status = 400;
    return next(error);
  }

  const collection = db.collection("flashcards");
  const query = { _id: new ObjectId(id) };

  const updateDocument = {
    $set: {
      question: question,
      answer: answer,
    },
  };

  try {
    const result = await collection.updateOne(query, updateDocument);

    if (result.modifiedCount === 0) { 
      throw new Error(`Flashcard was not updated. Please try again`);
    }

    const updatedFlashcard = await collection.findOne(query); 

    if (!updatedFlashcard) { 
      throw new Error(`Flashcard not found. Please try again.`);
    }

    res.send(updatedFlashcard).status(200);  
  } catch (error) {
    return next(error);
  }
});

// Delete a flashcard
router.delete('/:id', async (req, res, next)  => { 
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const collection = db.collection("flashcards");

  try {
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      const error = new Error("Flashcard not found. Please try again.");
      error.status = 404;
      throw error;
    }

    res.status(200).send({ _id: id});  
  } catch (error) {
    return next(error);
  }
});

export default router;