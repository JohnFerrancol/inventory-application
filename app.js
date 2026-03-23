import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';

import createLocals from './middleware/createLocals.js';
import errorHandler from './middleware/errorHandler.js';

import indexRouter from './routes/indexRouter.js';
import gamesRouter from './routes/gamesRouter.js';
import categoriesRouter from './routes/categoriesRouter.js';

const app = express();

// Get filename, dirname and assetPaths for CSS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsPath = path.join(__dirname, 'public');

// Let Express App use Express Layouts and static files
app.use(expressLayouts);
app.use(express.static(assetsPath));

// Set Views engine anf Express layout
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout');

app.use(createLocals);

app.use('/', indexRouter);
app.use('/games', gamesRouter);
app.use('/categories', categoriesRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express Server - listening on port ${PORT}`);
});
