import pool from '../db/pool.js';

const getAllGenres = async () => {
  const { rows } = await pool.query(`SELECT * FROM genres`);
  return rows;
};

const insertNewGenre = async (newGenre) => {
  await pool.query(`INSERT INTO genres (name) VALUES ($1)`, [newGenre]);
};

export { getAllGenres, insertNewGenre };
