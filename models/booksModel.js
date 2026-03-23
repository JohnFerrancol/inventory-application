import pool from '../db/pool.js';

// Get all books
const getAllBooksAndTheirGenres = async () => {
  const { rows } = await pool.query(
    `SELECT title, author, genres.name AS genre FROM books JOIN genres ON books.genre_id=genres.id`
  );
  return rows;
};

export { getAllBooksAndTheirGenres };
