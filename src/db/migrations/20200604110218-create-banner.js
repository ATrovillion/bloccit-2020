module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Banners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      source: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      topicId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          // Check this for possible typo/bug issue--should the line below be "Topic"?
          model: 'Topics',
          key: 'id',
          as: 'topicId',
        },
      },
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Banners'),
};
