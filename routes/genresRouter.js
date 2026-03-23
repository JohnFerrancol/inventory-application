import { Router } from 'express';
import { getGenresPage } from '../controllers/genresController.js';

const genresRouter = Router();

genresRouter.get('/', getGenresPage);

export default genresRouter;
