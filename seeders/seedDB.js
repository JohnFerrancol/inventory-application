import { Client } from 'pg';
import 'dotenv/config';

const SQL = `
    -- CREATING TABLES

    CREATE TABLE IF NOT EXISTS games (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        publisher TEXT
    );

    CREATE TABLE IF NOT EXISTS genres (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS game_genres (
        game_id INT REFERENCES games(id) ON DELETE CASCADE,
        genre_id INT REFERENCES genres(id) ON DELETE CASCADE,
        PRIMARY KEY (game_id, genre_id)
    );

    -- Reset
    TRUNCATE game_genres, games, genres RESTART IDENTITY CASCADE;

    --------------------------------------------------
    -- Genres
    --------------------------------------------------
    INSERT INTO genres (name) VALUES
    ('RPG'),
    ('Action'),
    ('Open World'),
    ('Strategy'),
    ('Adventure'),
    ('Souls-like'),
    ('Shooter'),
    ('Puzzle'),
    ('Horror');

    --------------------------------------------------
    -- Games (with publisher as string)
    --------------------------------------------------
    INSERT INTO games (name, publisher) VALUES
    ('Elden Ring', 'FromSoftware'),
    ('Dark Souls III', 'FromSoftware'),
    ('Sekiro: Shadows Die Twice', 'FromSoftware'),
    ('The Witcher 3: Wild Hunt', 'CD Projekt Red'),
    ('Baldur''s Gate 3', 'Larian Studios'),
    ('Grand Theft Auto V', 'Rockstar Games'),
    ('Red Dead Redemption 2', 'Rockstar Games'),
    ('Portal 2', 'Valve'),
    ('DOOM Eternal', 'Bethesda'),
    ('Resident Evil 4', 'Capcom');

    --------------------------------------------------
    -- Relate games and genres
    --------------------------------------------------

    -- Elden Ring
    INSERT INTO game_genres (game_id, genre_id)
    SELECT g.id, gen.id
    FROM games g JOIN genres gen
    ON gen.name IN ('RPG', 'Action', 'Souls-like', 'Open World')
    WHERE g.name = 'Elden Ring';

    -- Dark Souls III
    INSERT INTO game_genres (game_id, genre_id)
    SELECT g.id, gen.id
    FROM games g JOIN genres gen
    ON gen.name IN ('RPG', 'Action', 'Souls-like')
    WHERE g.name = 'Dark Souls III';

    -- Sekiro
    INSERT INTO game_genres (game_id, genre_id)
    SELECT g.id, gen.id
    FROM games g JOIN genres gen
    ON gen.name IN ('Action', 'Adventure')
    WHERE g.name = 'Sekiro: Shadows Die Twice';

    -- Witcher 3
    INSERT INTO game_genres (game_id, genre_id)
    SELECT g.id, gen.id
    FROM games g JOIN genres gen
    ON gen.name IN ('RPG', 'Open World')
    WHERE g.name = 'The Witcher 3: Wild Hunt';

    -- Baldur's Gate 3
    INSERT INTO game_genres (game_id, genre_id)
    SELECT g.id, gen.id
    FROM games g JOIN genres gen
    ON gen.name IN ('RPG', 'Strategy')
    WHERE g.name = 'Baldur''s Gate 3';

    -- GTA V
    INSERT INTO game_genres (game_id, genre_id)
    SELECT g.id, gen.id
    FROM games g JOIN genres gen
    ON gen.name IN ('Action', 'Open World')
    WHERE g.name = 'Grand Theft Auto V';

    -- RDR2
    INSERT INTO game_genres (game_id, genre_id)
    SELECT g.id, gen.id
    FROM games g JOIN genres gen
    ON gen.name IN ('Action', 'Open World', 'Adventure')
    WHERE g.name = 'Red Dead Redemption 2';

    -- Portal 2
    INSERT INTO game_genres (game_id, genre_id)
    SELECT g.id, gen.id
    FROM games g JOIN genres gen
    ON gen.name IN ('Puzzle', 'Adventure')
    WHERE g.name = 'Portal 2';

    -- DOOM Eternal
    INSERT INTO game_genres (game_id, genre_id)
    SELECT g.id, gen.id
    FROM games g JOIN genres gen
    ON gen.name IN ('Shooter', 'Action')
    WHERE g.name = 'DOOM Eternal';

    -- Resident Evil 4
    INSERT INTO game_genres (game_id, genre_id)
    SELECT g.id, gen.id
    FROM games g JOIN genres gen
    ON gen.name IN ('Horror', 'Action')
    WHERE g.name = 'Resident Evil 4';
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
