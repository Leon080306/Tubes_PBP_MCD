'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const variants = [
      { mv_id: '11111111-1111-1111-1111-111111111111', nama_varian: 'Medium', harga_tambahan: 0, menu_id: 'f99a463b-9bd6-4b95-8713-d508de453fa6' },
      { mv_id: '22222222-2222-2222-2222-222222222222', nama_varian: 'Large', harga_tambahan: 5000, menu_id: 'f99a463b-9bd6-4b95-8713-d508de453fa6' },
      { mv_id: '33333333-3333-3333-3333-333333333333', nama_varian: 'Spicy', harga_tambahan: 0, menu_id: '72c5d903-e822-4eb7-a745-dc85f67750e3' },
      { mv_id: '44444444-4444-4444-4444-444444444444', nama_varian: 'Krispy', harga_tambahan: 0, menu_id: '72c5d903-e822-4eb7-a745-dc85f67750e3' },
      { mv_id: '55555555-5555-5555-5555-555555555555', nama_varian: 'Extra Hot', harga_tambahan: 2000, menu_id: '3fa36bf2-f3e1-4192-bfb2-511bff587bf6' }
    ].map(v => ({ ...v, createdAt: new Date(), updatedAt: new Date() }));

    await queryInterface.bulkInsert('MenuVarian', variants);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('MenuVarian', null, {});
  }
};