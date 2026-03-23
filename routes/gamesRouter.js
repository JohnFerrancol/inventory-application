import { Router } from 'express';
import { getGamesPage } from '../controllers/gamesController.js';

const gamesRouter = Router();

gamesRouter.get('/', getGamesPage);

export default gamesRouter;
