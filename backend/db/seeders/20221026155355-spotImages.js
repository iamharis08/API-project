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
        url: "https://res.cloudinary.com/urby-llc/image/upload/f_auto,h_660/jersey-city-apartments-1_qekytg.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://i.pinimg.com/736x/fa/9e/9e/fa9e9e9bc3aef71518f3864b4a59dd0a.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://i0.wp.com/files.tripstodiscover.com/files/2019/11/Walk-2-Beach-PRIVATE-Pool-Golf-Cart-Boating.jpeg?resize=784%2C588.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://www.newhomeflorida.com/wp-content/uploads/2020/10/1-233.jpg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://images1.apartments.com/i2/beWbVlJ0chF5dARbzyApZvXFXzO0kZBt2dJ_Pctua8Y/117/63-wall-street-new-york-ny-building-photo.jpg",
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
