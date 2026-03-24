import { Router } from 'express';
import {
  getBooks,
  newBooksGet,
  newBooksPost,
} from '../controllers/booksController.js';

const booksRouter = Router();

// HTTP Requests to get the books
booksRouter.get('/', getBooks);

// HTTP Requests to add new books
booksRouter.get('/new', newBooksGet);
booksRouter.post('/new', newBooksPost);

export default booksRouter;
