import pool from '../db/pool.js';

const getAllGenres = async () => {
  const { rows } = await pool.query(`SELECT * FROM genres`);
  return rows;
};

export { getAllGenres };
