import { Router } from 'express';
import {
  getGenres,
  newGenresGet,
  newGenresPost,
} from '../controllers/genresController.js';

const genresRouter = Router();

// HTTP Requests to get the genres
genresRouter.get('/', getGenres);

// HTTP Request to create new genres
genresRouter.get('/new', newGenresGet);
genresRouter.post('/new', newGenresPost);

export default genresRouter;
