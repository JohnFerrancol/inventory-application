import { Router } from 'express';
import { getBooksPage } from '../controllers/booksController.js';

const booksRouter = Router();

booksRouter.get('/', getBooksPage);

export default booksRouter;
