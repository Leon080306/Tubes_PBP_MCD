'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('OrderMenu', [
      // Order 1: Big Mac
      { 
        om_id: uuidv4(), 
        quantity: 1, 
        harga_awal: 38000, 
        order_id: '550e8400-e29b-41d4-a716-446655440001', 
        menu_id: 'e4b77437-ef3c-48a4-9176-4052fe8da0d3', 
        mv_id: '11111111-1111-1111-1111-111111111111', 
        mo_id: '02222222-2222-2222-2222-222222222222'  
      },
      // Order 2: PaNas 1
      { 
        om_id: uuidv4(), 
        quantity: 3, 
        harga_awal: 30000, 
        order_id: '550e8400-e29b-41d4-a716-446655440002', 
        menu_id: '72c5d903-e822-4eb7-a745-dc85f67750e3', 
        mv_id: '33333333-3333-3333-3333-333333333333', 
        mo_id: '04444444-4444-4444-4444-444444444444' 
      },
      // Order 3: Coca Cola Large
      { 
        om_id: uuidv4(), 
        quantity: 2, 
        harga_awal: 12000, 
        order_id: '550e8400-e29b-41d4-a716-446655440003', 
        menu_id: 'f99a463b-9bd6-4b95-8713-d508de453fa6', 
        mv_id: '22222222-2222-2222-2222-222222222222', 
        mo_id: '01111111-1111-1111-1111-111111111111' 
      },
      // Order 4: French Fries
      { 
        om_id: uuidv4(), 
        quantity: 1, 
        harga_awal: 20000, 
        order_id: '550e8400-e29b-41d4-a716-446655440004', 
        menu_id: 'c1a3f916-4a1f-4936-82a9-3f6f22a04f4e', 
        mv_id: '11111111-1111-1111-1111-111111111111', 
        mo_id: '05555555-5555-5555-5555-555555555555' 
      },
      // Order 5: Strawberry Sundae
      { 
        om_id: uuidv4(), 
        quantity: 2, 
        harga_awal: 18000, 
        order_id: '550e8400-e29b-41d4-a716-446655440005', 
        menu_id: '3fa36bf2-f3e1-4192-bfb2-511bff587bf6', 
        mv_id: '55555555-5555-5555-5555-555555555555', 
        mo_id: '01111111-1111-1111-1111-111111111111' 
      }
    ].map(om => ({ 
      ...om, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    })));
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('OrderMenu', null, {});
  }
};