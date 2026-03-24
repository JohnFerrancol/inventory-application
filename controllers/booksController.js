import {
  getAllBooksAndTheirGenres,
  getSearchedBooksAndTheirGenres,
  getBooksByGenres,
  insertNewBook,
} from '../models/booksModel.js';

import { validationResult, matchedData } from 'express-validator';
import newBookValidator from '../middleware/validators/bookValidator.js';

const getBooks = async (req, res) => {
  let books;
  if (req.query.genres) {
    const selectedGenres =
      typeof req.query.genres === 'string'
        ? [req.query.genres]
        : req.query.genres;

    books = await getBooksByGenres(selectedGenres);
  } else {
    books = req.query.q
      ? await getSearchedBooksAndTheirGenres(req.query.q)
      : await getAllBooksAndTheirGenres();
  }
  res.render('books', {
    title: 'Books',
    books: books,
    query: req.query.q,
    showAddBookDialog: false,
  });
};

const newBooksGet = async (req, res) => {
  const books = await getAllBooksAndTheirGenres();
  res.render('books', {
    title: 'New Book',
    books: books,
    showAddBookDialog: true,
  });
};

const newBooksPost = [
  newBookValidator,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const books = await getAllBooksAndTheirGenres();
      console.log(errors.array());
      return res.status(400).render('books', {
        title: 'New Book',
        books: books,
        showAddBookDialog: true,
        errors: errors.array(),
        formData: req.body,
      });
    }
    const { title, author, genre } = matchedData(req);
    await insertNewBook(title, author, genre);
    res.redirect('/books');
  },
];

export { getBooks, newBooksGet, newBooksPost };
