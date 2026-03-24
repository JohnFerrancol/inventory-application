import { insertNewGenre } from '../models/genresModel.js';
import { validationResult, matchedData } from 'express-validator';
import newGenreValidator from '../middleware/validators/genreValidator.js';

const getGenres = (req, res) => {
  res.render('genres', { title: 'Genres', showAddGenreDialog: false });
};

const newGenresGet = (req, res) => {
  res.render('genres', { title: 'New Genre', showAddGenreDialog: true });
};

const newGenresPost = [
  newGenreValidator,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).render('genres', {
        title: 'New Genre',
        showAddGenreDialog: true,
        errors: errors.array(),
        formData: req.body,
      });
    }
    const { genre } = matchedData(req);
    await insertNewGenre(genre);
    res.redirect('/genres');
  },
];

export { getGenres, newGenresGet, newGenresPost };
