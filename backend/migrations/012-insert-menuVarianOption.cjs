'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const variants = [
      { mv_id: '11111111-1111-1111-1111-111111111111', nama_varian: 'Medium', harga_tambahan: 0, menu_id: 'f99a463b-9bd6-4b95-8713-d508de453fa6' }, // Coca Cola
      { mv_id: '22222222-2222-2222-2222-222222222222', nama_varian: 'Large', harga_tambahan: 5000, menu_id: 'f99a463b-9bd6-4b95-8713-d508de453fa6' },
      { mv_id: '33333333-3333-3333-3333-333333333333', nama_varian: 'Spicy', harga_tambahan: 0, menu_id: '72c5d903-e822-4eb7-a745-dc85f67750e3' }, // PaNas 1
      { mv_id: '44444444-4444-4444-4444-444444444444', nama_varian: 'Krispy', harga_tambahan: 0, menu_id: '72c5d903-e822-4eb7-a745-dc85f67750e3' },
      { mv_id: '55555555-5555-5555-5555-555555555555', nama_varian: 'Extra Hot', harga_tambahan: 2000, menu_id: '3fa36bf2-f3e1-4192-bfb2-511bff587bf6' } // Sundae
    ].map(v => ({ ...v, createdAt: new Date(), updatedAt: new Date() }));

    const options = [
      { mo_id: '01111111-1111-1111-1111-111111111111', nama_option: 'No Ice', tambahan_harga: 0, menu_id: 'f99a463b-9bd6-4b95-8713-d508de453fa6' },
      { mo_id: '02222222-2222-2222-2222-222222222222', nama_option: 'Extra Cheese', tambahan_harga: 4000, menu_id: 'e4b77437-ef3c-48a4-9176-4052fe8da0d3' }, // Big Mac
      { mo_id: '03333333-3333-3333-3333-333333333333', nama_option: 'No Onion', tambahan_harga: 0, menu_id: 'e4b77437-ef3c-48a4-9176-4052fe8da0d3' },
      { mo_id: '04444444-4444-4444-4444-444444444444', nama_option: 'Add Egg', tambahan_harga: 6000, menu_id: '72c5d903-e822-4eb7-a745-dc85f67750e3' },
      { mo_id: '05555555-5555-5555-5555-555555555555', nama_option: 'Extra Sauce', tambahan_harga: 1000, menu_id: 'c1a3f916-4a1f-4936-82a9-3f6f22a04f4e' } // Fries
    ].map(o => ({ ...o, createdAt: new Date(), updatedAt: new Date() }));

    await queryInterface.bulkInsert('MenuVarian', variants);
    await queryInterface.bulkInsert('MenuOption', options);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('MenuOption', null, {});
    await queryInterface.bulkDelete('MenuVarian', null, {});
  }
};