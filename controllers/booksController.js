import {
  getAllBooksAndTheirGenres,
  getSearchedBooksAndTheirGenres,
  getBooksByGenres,
  insertNewBook,
} from '../models/booksModel.js';

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

const newBooksPost = async (req, res) => {
  const { title, author, genre } = req.body;
  await insertNewBook(title, author, genre);
  res.redirect('/books');
};

export { getBooks, newBooksGet, newBooksPost };
