const getGenresPage = (req, res) => {
  res.render('genres', { title: 'Genres' });
};

export { getGenresPage };
