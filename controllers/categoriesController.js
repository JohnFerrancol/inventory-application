const getCategoriesPage = (req, res) => {
  res.render('categories', { title: 'Categories' });
};

export { getCategoriesPage };
