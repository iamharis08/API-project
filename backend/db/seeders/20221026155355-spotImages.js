'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert(options, [
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
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-711284603657265315/original/2ce2a515-078f-4c71-9b94-e2d0997f46d0.jpeg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-711284603657265315/original/1d3faa49-0463-46a8-b080-c0223a685424.jpeg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-711284603657265315/original/cf3318de-8d6f-4308-b705-10b39317759e.jpeg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-711284603657265315/original/12998baa-87cb-43c5-9d98-cfcc097ce025.jpeg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-711284603657265315/original/11b9ee04-a7cf-4c58-a23e-f8085e8baf36.jpeg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-706381619820981565/original/f62cd94b-ead7-4d65-940d-6141562c57c3.jpeg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-706381619820981565/original/100de58a-c727-4275-9468-815e16e0ca5c.jpeg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-706381619820981565/original/55129fc4-c0f1-4e79-a360-97e425ab45de.jpeg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-706381619820981565/original/74c0ee2e-c84c-4da6-9b34-0074dbd318b2.jpeg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-706381619820981565/original/207374b9-3627-4dd7-b18e-155dec1e94e4.jpeg",
        preview: true
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-717383292590854818/original/28a1caa5-c886-4b9d-95f5-9a2bebe7d970.jpeg",
        preview: true
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-717383292590854818/original/effbc66b-a090-42e3-a6b8-30bb5dacc5e9.jpeg",
        preview: true
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-717383292590854818/original/d229109d-9001-49fb-93d4-3d44a99f0671.jpeg",
        preview: true
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-717383292590854818/original/f8d59fd8-b834-4039-a093-dcaed75702a1.jpeg",
        preview: true
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-717383292590854818/original/b544bc9f-a520-4fe7-9b0b-17e032502d9b.jpeg",
        preview: true
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-715848248732958341/original/4402ef01-5bb8-49c4-89b3-3652761d7a6d.jpeg",
        preview: true
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-715848248732958341/original/a39fa85a-8a4f-4774-b77c-91366ff5cd70.jpeg",
        preview: true
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-715848248732958341/original/937eb2df-25b5-4351-b7d9-42da37e6eb91.jpeg",
        preview: true
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-715848248732958341/original/d08b66d1-6eb0-4da5-8b9d-342b102a7449.jpeg",
        preview: true
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-715848248732958341/original/a92c8bed-0d6a-435d-9072-2bca6a442a28.jpeg",
        preview: true
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/03b6cb80-e1a3-43c6-8a7a-a04e7205caa5.jpg",
        preview: true
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-39113140/original/b133420b-e520-426a-ba44-0949dc2ab4ba.jpeg",
        preview: true
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-39113140/original/94822928-7889-4dec-94c6-9a171a66e4c2.jpeg",
        preview: true
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-39113140/original/b7dcb067-d129-4c16-966d-a717b08bfc06.jpeg",
        preview: true
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-39113140/original/6f703483-0354-43e4-9648-3fe7f5019b21.jpeg",
        preview: true
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/2adf6ef9-e131-431b-a34e-9566e768f509.jpg",
        preview: true
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/4316b6ec-2afd-4d03-bc3e-8b2887304fc3.jpg",
        preview: true
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/11bf0999-efa2-4657-ba09-72e94441d539.jpg",
        preview: true
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/e690cc94-d29f-4dc7-9c8f-6ee7e9c26fe9.jpg",
        preview: true
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/be0e95ec-ad5b-4753-9877-7d29855c6beb.jpg",
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
    options.tableName = 'SpotImages';
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete(options, {
       spotId: { [Op.in]: [1, 2, 3] }
     }, {});
  }
};
