import {
  getAllBooksAndTheirGenres,
  getSearchedBooksAndTheirGenres,
  getBooksByGenres,
  insertNewBook,
  getBookById,
  updateBookById,
  deleteBookById,
} from '../models/booksModel.js';

import { validationResult, matchedData } from 'express-validator';
import newBookValidator from '../middleware/validators/bookValidator.js';

// Middleware used to get the list of books to the index /books page
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
    showDeleteDialog: false,
  });
};

// Middleware used to render the form to add a new book
const newBooksGet = async (req, res) => {
  const books = await getAllBooksAndTheirGenres();
  res.render('books', {
    title: 'New Book',
    books: books,
    showAddBookDialog: true,
    showDeleteDialog: false,
    edit: false,
  });
};

// Middleware used to process the data from the form and insert the book to the table
const newBooksPost = [
  newBookValidator,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const books = await getAllBooksAndTheirGenres();
      return res.status(400).render('books', {
        title: 'New Book',
        books: books,
        showAddBookDialog: true,
        showDeleteDialog: false,
        errors: errors.array(),
        formData: req.body,
        edit: false,
      });
    }
    const { title, author, genre } = matchedData(req);
    await insertNewBook(title, author, genre);
    res.redirect('/books');
  },
];

// Controller used to render the form to the edit an existing book
const editBookGet = async (req, res) => {
  const bookData = await getBookById(req.params.id);
  const books = await getAllBooksAndTheirGenres();
  res.render('books', {
    title: 'Edit Book',
    books: books,
    showAddBookDialog: true,
    showDeleteDialog: false,
    formData: bookData,
    edit: true,
  });
};

// Middleware used to process the data from the form to update an existing book data
const editBookPost = [
  newBookValidator,
  async (req, res) => {
    const bookData = req.body;
    bookData['id'] = Number(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const books = await getAllBooksAndTheirGenres();
      return res.status(400).render('books', {
        title: 'Edit Book',
        books: books,
        showAddBookDialog: true,
        showDeleteDialog: false,
        errors: errors.array(),
        formData: bookData,
        edit: true,
      });
    }
    const id = req.params.id;
    const { title, author, genre } = matchedData(req);
    await updateBookById(title, author, genre, id);
    res.redirect('/books');
  },
];

// Middleware used to render the dialog to confirm the deletion of the selected book entry
const deleteBookGet = async (req, res) => {
  const books = await getAllBooksAndTheirGenres();
  const bookData = await getBookById(req.params.id);
  res.render('books', {
    title: 'Delete Book',
    books: books,
    showAddBookDialog: false,
    showDeleteDialog: true,
    edit: false,
    formData: bookData,
  });
};

// Middleware used to process the deletion of the book entry from the table
const deleteBookPost = async (req, res) => {
  const id = req.params.id;
  await deleteBookById(id);
  res.redirect('/books');
};

export {
  getBooks,
  newBooksGet,
  newBooksPost,
  editBookGet,
  editBookPost,
  deleteBookGet,
  deleteBookPost,
};
