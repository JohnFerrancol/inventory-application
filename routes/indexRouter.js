import { Router } from 'express';
import { getIndexPage } from '../controllers/indexController.js';

const indexRouter = Router();

// HTTP request to get the index page
indexRouter.get('/', getIndexPage);

export default indexRouter;
