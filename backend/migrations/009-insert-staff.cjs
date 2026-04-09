'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {

    const password = await bcrypt.hash('123456', 10);

    await queryInterface.bulkInsert('Staff', [
      {
        staff_id: uuidv4(),
        email: 'admin1@mcd.com',
        password: password,
        role: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        staff_id: uuidv4(),
        email: 'admin2@mcd.com',
        password: password,
        role: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        staff_id: uuidv4(),
        email: 'admin3@mcd.com',
        password: password,
        role: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        staff_id: uuidv4(),
        email: 'cashier1@mcd.com',
        password: password,
        role: 'Cashier',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        staff_id: uuidv4(),
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
