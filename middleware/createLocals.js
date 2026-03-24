import { getAllGenres } from '../models/genresModel.js';

const createLocals = async (req, res, next) => {
  res.locals.links = [
    { href: '/', text: 'OdinBook' },
    { href: '/books', text: 'Books' },
    { href: '/genres', text: 'Genres' },
  ];

  res.locals.errors = [];
  res.locals.formData = [];
  res.locals.genres = await getAllGenres();

  next();
};

export default createLocals;
