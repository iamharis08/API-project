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
        startDate: "2022-11-19",
        endDate: "2022-11-20"
      },
      {
        spotId: 2,
        userId: 3,
        startDate: "2022-11-10",
        endDate: "2022-11-20"
      },
      {
        spotId: 3,
        userId: 1,
        startDate: "2022-11-12",
        endDate: "2023-2-20"
      },
      {
        spotId: 2,
        userId: 1,
        startDate: "2023-1-12",
        endDate: "2023-1-20"
      },
      {
        spotId: 1,
        userId: 1,
        startDate: "2023-2-12",
        endDate: "2023-2-20"
      },
      {
        spotId: 2,
        userId: 1,
        startDate: "2022-2-12",
        endDate: "2022-2-20"
      },
      {
        spotId: 2,
        userId: 1,
        startDate: "2022-10-20",
        endDate: "2022-11-20"
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
