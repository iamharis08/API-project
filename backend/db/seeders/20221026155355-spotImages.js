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
        url: "https://s3-media0.fl.yelpcdn.com/bphoto/ELXBGTKH4_dKfZ8qgjbQoQ/ls.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://s3-media0.fl.yelpcdn.com/bphoto/eRV3EtGh3sdmhslYqSacyg/o.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://s3-media0.fl.yelpcdn.com/bphoto/emIIpAjd2muq7dM1PTga0A/348s.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://studydatascience.org/wp-content/uploads/2019/10/35932346_1745684158852431_1214077827402432512_n.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://studydatascience.org/wp-content/uploads/2019/10/37585917_1786972501390263_5834834735154593792_n.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://res.cloudinary.com/urby-llc/image/upload/f_auto,h_660/jersey-city-apartments-1_qekytg.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://blog.thefoundersclub.com/hubfs/Past%20Models%20or%20Homes/Isabella%20Grande%20Model%20%28Do%20Not%20Use%29/The%20Isabella%20Grande%20luxury%20home%20features%20a%20coastal%20contemporary%20design%20throughout%20its%20open%20floor%20plan.jpg",
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
