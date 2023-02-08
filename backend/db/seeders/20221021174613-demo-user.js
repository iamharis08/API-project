'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'Demo',
        lastName: 'User',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: 'Walter',
        lastName: 'White',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: 'Joe',
        lastName: 'Rogan',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user3@user.io',
        username: 'FakeUser3',
        firstName: 'Adam',
        lastName: 'Levine',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user4@user.io',
        username: 'FakeUser4',
        firstName: 'Daniel',
        lastName: 'Flores',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user5@user.io',
        username: 'FakeUser5',
        firstName: 'Joji',
        lastName: 'Yui',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user6@user.io',
        username: 'FakeUser6',
        firstName: 'Dan',
        lastName: 'Purcell',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user7@user.io',
        username: 'FakeUser7',
        firstName: 'Bill',
        lastName: 'Adams',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
