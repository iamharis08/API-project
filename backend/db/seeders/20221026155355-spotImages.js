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
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/dfe9fd1e-a010-43c9-b546-0bbc7d59f7f3.jpeg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/0e074fc5-2d13-422d-bc5a-af14595f2f38.jpeg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/5a06ec14-3591-459f-86ec-dfe5be7c203c.jpeg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/b027074b-b708-4e00-84f6-37e8d1ab7aac.jpeg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/53b475a3-104f-462e-8faf-85a7bcd1f13b.jpeg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-715759276214360126/original/875ea373-9fa5-4632-9228-0bb8aa3efa88.jpeg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-715759276214360126/original/a811a4d0-14d2-45f1-ac43-9964f61c261a.jpeg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-715759276214360126/original/96bd40c8-a62a-4f4e-8c5e-f4a85656084a.jpeg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-715759276214360126/original/efb19fc3-7027-4b95-aa85-41e9b1339224.jpeg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-715759276214360126/original/6c04ca59-6e3b-4cf3-8cb2-210b01e4f09a.jpeg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-740634701378172939/original/8ef7a4b0-79b0-439c-9da0-4a170ad4090d.jpeg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-740634701378172939/original/64d725da-b287-4c39-b298-aeb7595f32b0.jpeg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-740634701378172939/original/92b1145f-801b-4a4a-b448-dc167dc5f232.jpeg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-740634701378172939/original/4e36f28d-27cf-4bea-b473-c83ddec5fb9b.jpeg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/69d2ff67-4b28-4d53-aba8-b628542cee40.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-713898202877836679/original/5bd69eb7-e4ae-4615-97b7-440f1658683c.jpeg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-713898202877836679/original/708fb461-5cdb-4a35-8e8e-87d2043dbd41.jpeg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-713898202877836679/original/e83d3fd8-d56b-4515-89c3-5764e595596a.jpeg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-713898202877836679/original/150e8819-9d4b-4a23-8776-d625dce687c8.jpeg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-713898202877836679/original/c1fb9e69-a0a9-46bf-ad47-7641b25ba0d0.jpeg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-729597790487190657/original/07c2691a-7a40-4740-bf9b-6e821b52547b.jpeg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-729597790487190657/original/d96f67a7-39f3-46ab-a341-e3b57b2b1c2f.jpeg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/6b276b37-4ca4-44b1-a8cf-62eba91c8831.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-729597790487190657/original/bc63427b-48a3-479e-b64f-7875c6ddca8f.jpeg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-729597790487190657/original/b206fe45-1282-43f3-970d-8799e6c5a6c9.jpeg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-686120619798893603/original/36deb313-d961-4cea-b9e1-045bb5907ec7.jpeg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-686120619798893603/original/3885e18b-32af-4df7-8ebb-a536bb6bcda2.jpeg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-686120619798893603/original/633e26d7-456a-45e8-a718-a7f27c32ff7f.jpeg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-686120619798893603/original/665186b6-1a82-434e-bf79-35fef4563f9d.jpeg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-686120619798893603/original/2029ac47-d992-4130-930c-ab721f1d20b0.jpeg",
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
