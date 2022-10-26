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
     return queryInterface.bulkInsert('Reviews', [
      {
      userId: 1,
      spotId: 1,
      review: "I love App Academy with a passion, best bootcamp out there no kizzy",
      stars: 5,
      },
      {
        userId: 2,
        spotId: 2,
        review: "I hated this place, instead of counting sheeps at night I was counting rats",
        stars: 0,
      },
      {
        userId: 3,
        spotId: 3,
        review: "Had a blast here, one of my best memories for sure",
        stars: 5,
      },
      {
        userId: 3,
        spotId: 1,
        review: "I lve App Academy with a passion, best bootcamp out there no kizzy",
        stars: 2,
      }
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
     return queryInterface.bulkDelete('Reviews', {
       userId: { [Op.in]: [1, 2, 3] }
     }, {});

  }
};
