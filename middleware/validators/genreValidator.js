import { body } from 'express-validator';
import { getAllGenres } from '../../models/genresModel.js';

const newGenreValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Genre is required')
    .bail()
    .isLength({ max: 30 })
    .withMessage('Genre has a 30 characters limit')
    .bail()
    .custom(async (value) => {
      // Declare a function used to check whether the input passed in the form exists in the genres table, if so throw error
      const genres = await getAllGenres();
      const genreNames = genres.map((g) => g.name.toLowerCase());

      if (genreNames.includes(value.trim().toLowerCase())) {
        throw new Error('Genre already exists');
      }

      return true;
    }),
];

export default newGenreValidator;
