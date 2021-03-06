// eslint-disable-next-line prefer-destructuring
const Ad = require('./models').Ad;

module.exports = {
  getAllAds(callback) {
    return Ad.findAll()
      .then(ads => {
        callback(null, ads);
      })
      .catch(err => {
        callback(err);
      });
  },
  addAd(newAd, callback) {
    return Ad.create({
      title: newAd.title,
      description: newAd.description,
    })
      .then(ad => {
        callback(null, ad);
      })
      .catch(err => {
        callback(err);
      });
  },
  getAd(id, callback) {
    return Ad.findByPk(id)
      .then(ad => {
        callback(null, ad);
      })
      .catch(err => {
        callback(err);
      });
  },
  deleteAd(id, callback) {
    return Ad.destroy({
      where: { id },
    })
      .then(ad => {
        callback(null, ad);
      })
      .catch(err => {
        callback(err);
      });
  },
  updateAd(id, updatedAd, callback) {
    return Ad.findByPk(id).then(ad => {
      if (!ad) {
        return callback('Ad not found');
      }

      ad.update(updatedAd, {
        fields: Object.keys(updatedAd),
      })
        .then(() => {
          callback(null, ad);
        })
        .catch(err => {
          callback(err);
        });
    });
  },
};
