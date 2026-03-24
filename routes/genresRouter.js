import { Router } from 'express';
import {
  getGenres,
  newGenresGet,
  newGenresPost,
  editGenresGet,
  editGenresPost,
} from '../controllers/genresController.js';

const genresRouter = Router();

// HTTP Requests to get the genres
genresRouter.get('/', getGenres);

// HTTP Request to create new genres
genresRouter.get('/new', newGenresGet);
genresRouter.post('/new', newGenresPost);

// HTTP request to edit existing genres
genresRouter.get('/:id/edit', editGenresGet);
genresRouter.post('/:id/edit', editGenresPost);

export default genresRouter;
