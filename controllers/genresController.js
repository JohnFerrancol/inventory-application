import { insertNewGenre } from '../models/genresModel.js';

const getGenres = (req, res) => {
  res.render('genres', { title: 'Genres', showAddGenreDialog: false });
};

const newGenresGet = (req, res) => {
  res.render('genres', { title: 'New Genre', showAddGenreDialog: true });
};

const newGenresPost = async (req, res) => {
  const { genre } = req.body;
  await insertNewGenre(genre);
  res.redirect('/genres');
};

export { getGenres, newGenresGet, newGenresPost };
