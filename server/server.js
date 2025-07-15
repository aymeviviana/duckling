import express from 'express';
import "./loadEnvironment.js";
import flashcards from './routes/flashcards.js';
import cors from 'cors';
import errorHandler from './middleware/errorHandler.js';

const port = process.env.PORT || 3001;
const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/flashcards', flashcards);

app.use(errorHandler);


app.listen(port, () => console.log(`Server is running on port ${port}`));