import { body } from 'express-validator';
import { getAllGenres } from '../../models/genresModel.js';

const newGenreValidator = [
  body('genre')
    .trim()
    .notEmpty()
    .withMessage('Genre is required')
    .bail()
    .isLength({ max: 30 })
    .withMessage('Genre has a 30 characters limit')
    .bail()
    .custom(async (value) => {
      const genres = await getAllGenres();
      const genreNames = genres.map((g) => g.name.toLowerCase());

      if (genreNames.includes(value.trim().toLowerCase())) {
        throw new Error('Genre already exists');
      }

      return true;
    }),
];

export default newGenreValidator;
