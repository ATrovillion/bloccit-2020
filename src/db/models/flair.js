module.exports = (sequelize, DataTypes) => {
  const Flair = sequelize.define(
    'Flair',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      topicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
  Flair.associate = function(models) {
    Flair.belongsTo(models.Topic, {
      foreignKey: 'topicId',
      onDelete: 'CASCADE',
    });
    // associations can be defined here
  };
  return Flair;
};
