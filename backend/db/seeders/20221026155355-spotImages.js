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
        url: "https://images.alphacoders.com/435/thumb-1920-435117.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://images.alphacoders.com/605/605759.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://8interiors.com/orig/0/62/623/6232/8interiors.com-big-dream-big-house-623249.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80",
        preview: true
      },
      {
        spotId: 1,
        url: "https://wallpaperaccess.com/full/2492037.jpg",
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
