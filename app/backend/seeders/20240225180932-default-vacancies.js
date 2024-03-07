'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Vacancies', [{
      name: "Frontend-developer",
      description: "We are looking for a frontend-developer",
      ownerId: 1,
      ownerName: "John Doe",
      salary: "1000$",
      open: true
    },
    {
      name: "Backend-developer",
      description: "We need a backend developer asap!!!",
      ownerId: 1,
      ownerName: "John Doe",
      open: true
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
