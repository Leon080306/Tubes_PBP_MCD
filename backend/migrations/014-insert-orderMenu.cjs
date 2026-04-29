'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('OrderMenu', [
      { om_id: 'aa000001-0000-0000-0000-000000000001', quantity: 1, harga_awal: 38000, order_id: '550e8400-e29b-41d4-a716-446655440001', menu_id: 'e4b77437-ef3c-48a4-9176-4052fe8da0d3', mv_id: '11111111-1111-1111-1111-111111111111' },
      { om_id: 'aa000001-0000-0000-0000-000000000002', quantity: 3, harga_awal: 30000, order_id: '550e8400-e29b-41d4-a716-446655440002', menu_id: '72c5d903-e822-4eb7-a745-dc85f67750e3', mv_id: '33333333-3333-3333-3333-333333333333' },
      { om_id: 'aa000001-0000-0000-0000-000000000003', quantity: 2, harga_awal: 12000, order_id: '550e8400-e29b-41d4-a716-446655440003', menu_id: 'f99a463b-9bd6-4b95-8713-d508de453fa6', mv_id: '22222222-2222-2222-2222-222222222222' },
      { om_id: 'aa000001-0000-0000-0000-000000000004', quantity: 1, harga_awal: 20000, order_id: '550e8400-e29b-41d4-a716-446655440004', menu_id: 'c1a3f916-4a1f-4936-82a9-3f6f22a04f4e', mv_id: '11111111-1111-1111-1111-111111111111' }
    ].map(om => ({ ...om, createdAt: new Date(), updatedAt: new Date() })));
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('OrderMenu', null, {});
  }
};