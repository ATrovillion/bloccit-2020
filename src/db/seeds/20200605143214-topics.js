/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');

const topics = [];

// eslint-disable-next-line no-plusplus
for (let i = 1; i <= 15; i++) {
  topics.push({
    title: faker.hacker.noun(),
    description: faker.hacker.phrase(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

module.exports = {
  up: (queryInterface, Sequelize) =>
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    queryInterface.bulkInsert('Topics', topics, {}),
  down: (queryInterface, Sequelize) =>
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    queryInterface.bulkDelete('Topics', null, {}),
};
