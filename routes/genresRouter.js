import { Router } from 'express';
import {
  getGenres,
  newGenresGet,
  newGenresPost,
  editGenresGet,
  editGenresPost,
  deleteGenresGet,
  deleteGenresPost,
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

// HTTP request to delete genres not in use
genresRouter.get('/:id/delete', deleteGenresGet);
genresRouter.post('/:id/delete', deleteGenresPost);

export default genresRouter;
