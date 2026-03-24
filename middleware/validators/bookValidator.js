import { body } from 'express-validator';
import { getAllGenres } from '../../models/genresModel.js';

const newBookValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .bail()
    .isLength({ max: 120 })
    .withMessage('Title has a 120 characters limit'),
  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author is required')
    .bail()
    .isLength({ max: 60 })
    .withMessage('Author has a 60 characters limit'),
  body('genre')
    .trim()
    .notEmpty()
    .withMessage('Genre is required')
    .bail()
    .custom(async (value) => {
      const genres = await getAllGenres();
      const genreNames = genres.map((g) => g.name);

      if (!genreNames.includes(value)) {
        throw new Error('Invalid genre selected');
      }

      return true;
    }),
];

export default newBookValidator;
