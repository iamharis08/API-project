'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 2,
        startDate: "2021-11-19",
        endDate: "2021-11-20"
      },
      {
        spotId: 2,
        userId: 3,
        startDate: "2021-11-10",
        endDate: "2021-11-20"
      },
      {
        spotId: 3,
        userId: 1,
        startDate: "2021-11-12",
        endDate: "2021-11-20"
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete('Bookings', {
       spotId: { [Op.in]: [1, 2, 3] }
     }, {});
  }
};
