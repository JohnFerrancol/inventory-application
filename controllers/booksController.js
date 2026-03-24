import {
  getAllBooksAndTheirGenres,
  getSearchedBooksAndTheirGenres,
  getBooksByGenres,
} from '../models/booksModel.js';

const getBooksPage = async (req, res) => {
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
  console.log(books);
  res.render('books', { title: 'Books', books: books, query: req.query.q });
};

export { getBooksPage };
