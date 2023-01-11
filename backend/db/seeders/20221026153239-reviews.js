"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(
      options,
      [
        {
          userId: 4,
          spotId: 1,
          review:"I loved this place! It was like no other I had visited before. Will definetly come back! It was in a nice location as well.",
          stars: 5,
        },
        {
          userId: 2,
          spotId: 1,
          review:"Reviews dont lie and this one doesn't either, let me tell ya it was a blast. Havent had this much fun in a long time. It was Amazing",
          stars: 4,
        },
        {
          userId: 3,
          spotId: 1,
          review:"Amazing, will be back again, this time I will bring more people. Definetly recommend this place, the view was amazing",
          stars: 5,
        },
        {
          userId: 5,
          spotId: 1,
          review:"It was clean and the view was good. Pets were allowed. The staff was amazing. I would def recommend",
          stars: 5,
        },
        {
          userId: 6,
          spotId: 1,
          review:"I didnt like the lighting, seemed a bit dim for my liking. Not a big deal, but it definetly was not perfect.",
          stars: 3.5,
        },
        {
          userId: 7,
          spotId: 1,
          review:"When we go there the a/c stopped malfunctioned, but luckily the wind was great that night. The owner was very nice and fixed the a/c in the morning also gave us a refund.",
          stars: 4,
        },
        {
          userId: 3,
          spotId: 2,
          review: "Had a blast here, one of my best memories for sure",
          stars: 5,
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        userId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
