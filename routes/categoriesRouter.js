import { Router } from 'express';
import { getCategoriesPage } from '../controllers/categoriesController.js';

const categoriesRouter = Router();

categoriesRouter.get('/', getCategoriesPage);

export default categoriesRouter;
