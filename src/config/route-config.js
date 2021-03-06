/* eslint-disable global-require */
module.exports = {
  init(app) {
    const staticRoutes = require('../routes/static');
    const postRoutes = require('../routes/posts');
    const userRoutes = require('../routes/users');
    const topicRoutes = require('../routes/topics');
    const adRoutes = require('../routes/ads');
    app.use(staticRoutes);
    app.use(topicRoutes);
    app.use(adRoutes);
    app.use(postRoutes);
    app.use(userRoutes);
  },
};
