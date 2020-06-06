'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ad = sequelize.define('Ad', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Ad.associate = function(models) {
    // associations can be defined here
  };
  return Ad;
};