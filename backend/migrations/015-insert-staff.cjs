'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {

    const password = await bcrypt.hash('123456', 10);

    await queryInterface.bulkInsert('Staff', [
      {
        staff_id: uuidv4(),
        name: 'admin 1',
        email: 'admin1@mcd.com',
        password: password,
        role: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        staff_id: uuidv4(),
        name: 'admin 2',
        email: 'admin2@mcd.com',
        password: password,
        role: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        staff_id: uuidv4(),
        name: 'admin 3',
        email: 'admin3@mcd.com',
        password: password,
        role: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        staff_id: uuidv4(),
        name: 'kasir 1',
        email: 'cashier1@mcd.com',
        password: password,
        role: 'Cashier',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        staff_id: uuidv4(),
        name: 'kasir 2',
        email: 'cashier2@mcd.com',
        password: password,
        role: 'Cashier',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Staff', null, {});
  }
};
