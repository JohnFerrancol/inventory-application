import pool from '../db/pool.js';

// Get all books
const getAllBooksAndTheirGenres = async () => {
  const { rows } = await pool.query(
    `SELECT title, author, genres.name AS genre FROM books JOIN genres ON books.genre_id=genres.id`
  );
  return rows;
};

const getSearchedBooksAndTheirGenres = async (searchQuery) => {
  const { rows } = await pool.query(
    `SELECT title, author, genres.name AS genre FROM books JOIN genres ON books.genre_id=genres.id WHERE title ILIKE $1`,
    [`%${searchQuery}%`]
  );
  return rows;
};

const getBooksByGenres = async (selectedGenres) => {
  const { rows } = await pool.query(
    `SELECT title, author, genres.name AS genre FROM books JOIN genres ON books.genre_id=genres.id WHERE genres.name = ANY($1)`,
    [selectedGenres]
  );
  return rows;
};

const insertNewBook = async (title, author, genre) => {
  await pool.query(
    `
    INSERT INTO books (title, author, genre_id) VALUES
    ($1, $2, (SELECT id FROM genres WHERE name = $3))`,
    [title, author, genre]
  );
};

export {
  getAllBooksAndTheirGenres,
  getSearchedBooksAndTheirGenres,
  getBooksByGenres,
  insertNewBook,
};
