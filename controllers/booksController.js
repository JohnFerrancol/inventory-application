const getBooksPage = (req, res) => {
  res.render('books', { title: 'Books' });
};

export { getBooksPage };
