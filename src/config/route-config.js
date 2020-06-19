module.exports = {
  init(app) {
    const staticRoutes = require('../routes/static');
    const postRoutes = require('../routes/posts');
    const topicRoutes = require('../routes/topics');
    const adRoutes = require('../routes/ads');
    const flairRoutes = require('../routes/flairs');
    app.use(staticRoutes);
    app.use(topicRoutes);
    app.use(adRoutes);
    app.use(postRoutes);
    app.use(flairRoutes);
  },
};
