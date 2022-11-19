"use strict";

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
    return queryInterface.bulkInsert(
      "Spots",
      [
        {
          ownerId: 1,
          address: "123 Disney Lane",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Mansion in the Mountains",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc hendrerit mollis ullamcorper. Curabitur interdum faucibus vestibulum. Pellentesque faucibus odio.",
          price: 123,
        },
        {
          ownerId: 2,
          address: "987 John F. Kennedy Blvd",
          city: "Jersey City",
          state: "New Jersey",
          country: "United States of America",
          lat: 40.719074,
          lng: -74.050552,
          name: "City Apartment",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc hendrerit mollis ullamcorper. Curabitur interdum faucibus vestibulum. Pellentesque faucibus odio.",
          price: 2500,
        },
        {
          ownerId: 3,
          address: "1001 LiveLaughLearn Drive",
          city: "Sarasota",
          state: "Florida",
          country: "United States of America",
          lat: 27.3365,
          lng: 82.531,
          name: "Beach House",
          description: "This is the definition of florida",
          price: 3000,
        },
        {
          ownerId: 3,
          address: "523 Lisbon Street",
          city: "Seffner",
          state: "Florida",
          country: "United States of America",
          lat: 30.3365,
          lng: 89.531,
          name: "Lake House",
          description: "One of the best homes Seffner has",
          price: 5000,
        },
        {
          ownerId: 3,
          address: "982 Sorbonne Loop",
          city: "Seffner",
          state: "Florida",
          country: "United States of America",
          lat: 30.4,
          lng: 89.531,
          name: "Lake House",
          description: "Lake access in the back",
          price: 5000,
        },
        {
          ownerId: 2,
          address: "320 Central Park West",
          city: "New York",
          state: "New York",
          country: "United States of America",
          lat: 21.3,
          lng: 17.3,
          name: "Lake House",
          description: "Lake access in the back",
          price: 7000,
        },
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
      "Spots",
      {
        ownerId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
