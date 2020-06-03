module.exports = {
  index(req, res, next) {
    res.render('static/index', { title: 'Welcome to Bloccit 2020' });
  },

  about(req, res, next) {
    res.render('static/about', { title: 'About Bloccit 2020' });
  },
};
