import {
  getGenreById,
  insertNewGenre,
  updateGenreById,
  deleteGenreByID,
} from '../models/genresModel.js';
import { validationResult, matchedData } from 'express-validator';
import newGenreValidator from '../middleware/validators/genreValidator.js';

// Middleware used to render the list of genres to the index /genres page
const getGenres = async (req, res) => {
  res.render('genres', {
    title: 'Genres',
    showAddGenreDialog: false,
    showDeleteDialog: false,
  });
};

// Middleware used to render the form to add a new genre
const newGenresGet = (req, res) => {
  res.render('genres', {
    title: 'New Genre',
    showAddGenreDialog: true,
    edit: false,
    showDeleteDialog: false,
  });
};

// Middleware used to process the data from the form and insert the data to the table
const newGenresPost = [
  newGenreValidator,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('genres', {
        title: 'New Genre',
        showAddGenreDialog: true,
        showDeleteDialog: false,
        errors: errors.array(),
        formData: req.body,
        edit: false,
      });
    }
    const { name } = matchedData(req);
    await insertNewGenre(name);
    res.redirect('/genres');
  },
];

// Middleware used to render the form to edit an existing genre
const editGenresGet = async (req, res) => {
  const genreData = await getGenreById(req.params.id);
  res.render('genres', {
    title: 'Edit Genre',
    showAddGenreDialog: true,
    showDeleteDialog: false,
    formData: genreData,
    edit: true,
  });
};

// Middleware used to process the data from the form and update the data
const editGenresPost = [
  newGenreValidator,
  async (req, res) => {
    const genreData = req.body;
    genreData['id'] = Number(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('genres', {
        title: 'Edit Genre',
        showAddGenreDialog: true,
        showDeleteDialog: false,
        errors: errors.array(),
        formData: genreData,
        edit: true,
      });
    }
    const { name } = matchedData(req);
    const id = req.params.id;
    await updateGenreById(name, id);
    res.redirect('/genres');
  },
];

// Middleware used to render the modal to confirm the deletion of the selected genre
const deleteGenresGet = async (req, res) => {
  const genreData = await getGenreById(req.params.id);
  res.render('genres', {
    title: 'Delete Genre',
    showAddGenreDialog: false,
    showDeleteDialog: true,
    formData: genreData,
    edit: true,
  });
};

// Middleware used to process the deletion of the genre from the table
const deleteGenresPost = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await deleteGenreByID(id);
  res.redirect('/genres');
};

export {
  getGenres,
  newGenresGet,
  newGenresPost,
  editGenresGet,
  editGenresPost,
  deleteGenresGet,
  deleteGenresPost,
};
