const getGamesPage = (req, res) => {
  res.render('games', { title: 'Games' });
};

export { getGamesPage };
