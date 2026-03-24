import { getAllGenres } from '../models/genresModel.js';
import { getAllBooksAndTheirGenres } from '../models/booksModel.js';

const createLocals = async (req, res, next) => {
  res.locals.links = [
    { href: '/', text: 'OdinBook' },
    { href: '/books', text: 'Books' },
    { href: '/genres', text: 'Genres' },
  ];

  const books = await getAllBooksAndTheirGenres();

  res.locals.usedGenres = new Set(books.map((b) => b.genre));
  res.locals.errors = [];
  res.locals.formData = [];
  res.locals.genres = await getAllGenres();

  next();
};

export default createLocals;
