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
     return queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: "https://s3-media0.fl.yelpcdn.com/bphoto/eRV3EtGh3sdmhslYqSacyg/o.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLGgijcP5bTgMkNDofF6LPEUFFTpQ0fO0BAw&usqp=CAU.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzf7YlYhlRfZms09X92YMxdpOaMd5wDGTcMQ&usqp=CAU.jpg",
        preview: true
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
     return queryInterface.bulkDelete('SpotImages', {
       spotId: { [Op.in]: [1, 2, 3] }
     }, {});
  }
};
