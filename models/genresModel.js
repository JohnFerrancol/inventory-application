import pool from '../db/pool.js';

const getAllGenres = async () => {
  const { rows } = await pool.query(`SELECT * FROM genres ORDER BY id`);
  return rows;
};

const getGenreById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM genres WHERE id=$1`, [id]);
  return rows[0];
};

const insertNewGenre = async (newGenre) => {
  await pool.query(`INSERT INTO genres (name) VALUES ($1)`, [newGenre]);
};

const updateGenreById = async (newGenre, id) => {
  await pool.query(`UPDATE genres SET name=$1 WHERE id=$2`, [newGenre, id]);
};

export { getAllGenres, insertNewGenre, getGenreById, updateGenreById };
