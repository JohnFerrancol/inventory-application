import { Client } from 'pg';
import 'dotenv/config';

const SQL = `
  -----------------------------------------------------
  -- Genres table
  -- --------------------------------------------------
  CREATE TABLE IF NOT EXISTS genres (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL
  );

  -----------------------------------------------------
  -- Books table
  -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      author TEXT,
      genre_id INT REFERENCES genres(id) ON DELETE SET NULL
  );

  -- Reset
  TRUNCATE books, genres RESTART IDENTITY CASCADE;

  --------------------------------------------------
  -- Genres
  --------------------------------------------------
  INSERT INTO genres (name) VALUES
  ('Fantasy'),
  ('Science Fiction'),
  ('Mystery'),
  ('Thriller'),
  ('Romance'),
  ('Horror'),
  ('Non-fiction'),
  ('Self-help');

  --------------------------------------------------
  -- Books
  --------------------------------------------------
  INSERT INTO books (title, author, genre_id) VALUES

  ('The Hobbit', 'J.R.R. Tolkien', (SELECT id FROM genres WHERE name = 'Fantasy')),
  ('Mistborn: The Final Empire', 'Brandon Sanderson', (SELECT id FROM genres WHERE name = 'Fantasy')),
  ('Dune', 'Frank Herbert', (SELECT id FROM genres WHERE name = 'Science Fiction')),
  ('1984', 'George Orwell', (SELECT id FROM genres WHERE name = 'Science Fiction')),
  ('The Da Vinci Code', 'Dan Brown', (SELECT id FROM genres WHERE name = 'Thriller')),
  ('Gone Girl', 'Gillian Flynn', (SELECT id FROM genres WHERE name = 'Thriller')),
  ('The Girl with the Dragon Tattoo', 'Stieg Larsson', (SELECT id FROM genres WHERE name = 'Mystery')),
  ('The Shining', 'Stephen King', (SELECT id FROM genres WHERE name = 'Horror')),
  ('Misery', 'Stephen King', (SELECT id FROM genres WHERE name = 'Thriller')),
  ('Pride and Prejudice', 'Jane Austen', (SELECT id FROM genres WHERE name = 'Romance')),
  ('Atomic Habits', 'James Clear', (SELECT id FROM genres WHERE name = 'Self-help')),
  ('The 7 Habits of Highly Effective People', 'Stephen Covey', (SELECT id FROM genres WHERE name = 'Self-help'))
`;

const main = async () => {
  console.log('Seeding Inventory Application Database....');
  const client = new Client({ connectionString: process.env.DB_URL });

  try {
    await client.connect();
    await client.query(SQL);
    console.log('Done');
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
};

main();
