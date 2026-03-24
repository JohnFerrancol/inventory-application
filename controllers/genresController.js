import {
  getGenreById,
  insertNewGenre,
  updateGenreById,
  deleteGenreByID,
} from '../models/genresModel.js';
import { validationResult, matchedData } from 'express-validator';
import newGenreValidator from '../middleware/validators/genreValidator.js';

const getGenres = async (req, res) => {
  res.render('genres', {
    title: 'Genres',
    showAddGenreDialog: false,
    showDeleteDialog: false,
  });
};

const newGenresGet = (req, res) => {
  res.render('genres', {
    title: 'New Genre',
    showAddGenreDialog: true,
    edit: false,
    showDeleteDialog: false,
  });
};

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
