import { Router } from 'express';
import {
  getBooks,
  newBooksGet,
  newBooksPost,
  editBookGet,
  editBookPost,
} from '../controllers/booksController.js';

const booksRouter = Router();

// HTTP Requests to get the books
booksRouter.get('/', getBooks);

// HTTP Requests to add new books
booksRouter.get('/new', newBooksGet);
booksRouter.post('/new', newBooksPost);

// HTTP Requests to edit existing books
booksRouter.get('/:id/edit', editBookGet);
booksRouter.post('/:id/edit', editBookPost);

export default booksRouter;
