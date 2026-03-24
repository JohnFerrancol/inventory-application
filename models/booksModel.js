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

export {
  getAllBooksAndTheirGenres,
  getSearchedBooksAndTheirGenres,
  getBooksByGenres,
};
