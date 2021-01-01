'use strict';

const snippet = require("../models/snippet");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Annotations', [{
    user_id: 1,
    line_id: 1,
    annotation: "you specify your method and route",
    vote_total: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    snippet_id: 1
  }], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
