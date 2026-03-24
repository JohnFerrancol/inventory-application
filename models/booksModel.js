import pool from '../db/pool.js';

// Get all books
const getAllBooksAndTheirGenres = async () => {
  const { rows } = await pool.query(
    `SELECT books.id, title, author, genres.name AS genre FROM books JOIN genres ON books.genre_id=genres.id ORDER BY books.id`
  );
  return rows;
};

const getSearchedBooksAndTheirGenres = async (searchQuery) => {
  const { rows } = await pool.query(
    `SELECT books.id, title, author, genres.name AS genre FROM books JOIN genres ON books.genre_id=genres.id WHERE title ILIKE $1 ORDER BY books.id`,
    [`%${searchQuery}%`]
  );
  return rows;
};

const getBooksByGenres = async (selectedGenres) => {
  const { rows } = await pool.query(
    `SELECT books.id, title, author, genres.name AS genre FROM books JOIN genres ON books.genre_id=genres.id WHERE genres.name = ANY($1) ORDER BY books.id`,
    [selectedGenres]
  );
  return rows;
};

const getBookById = async (bookId) => {
  const { rows } = await pool.query(
    `SELECT books.id, title, author, genres.name AS genre FROM books JOIN genres ON books.genre_id=genres.id WHERE books.id = $1`,
    [bookId]
  );
  return rows[0];
};

const insertNewBook = async (title, author, genre) => {
  await pool.query(
    `
    INSERT INTO books (title, author, genre_id) VALUES
    ($1, $2, (SELECT id FROM genres WHERE name = $3))`,
    [title, author, genre]
  );
};

const updateBookById = async (title, author, genre, book_id) => {
  await pool.query(
    `
    UPDATE books 
    SET title = $1,
        author = $2,
        genre_id = (SELECT id FROM genres WHERE name = $3)
    WHERE id = $4
    `,
    [title, author, genre, book_id]
  );
};

export {
  getAllBooksAndTheirGenres,
  getSearchedBooksAndTheirGenres,
  getBooksByGenres,
  getBookById,
  insertNewBook,
  updateBookById,
};
