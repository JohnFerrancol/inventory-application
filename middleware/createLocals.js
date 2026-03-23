const createLocals = async (req, res, next) => {
  res.locals.links = [
    { href: '/', text: 'Odin Games' },
    { href: '/games', text: 'Games' },
    { href: '/categories', text: 'Categories' },
  ];
  next();
};

export default createLocals;
