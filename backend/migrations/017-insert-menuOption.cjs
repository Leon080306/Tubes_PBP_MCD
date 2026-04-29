'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const options = [
            { mo_id: '01111111-1111-1111-1111-111111111111', nama_option: 'No Ice', tambahan_harga: 0, menu_id: 'f99a463b-9bd6-4b95-8713-d508de453fa6' },
            { mo_id: '02222222-2222-2222-2222-222222222222', nama_option: 'Extra Cheese', tambahan_harga: 4000, menu_id: 'e4b77437-ef3c-48a4-9176-4052fe8da0d3' },
            { mo_id: '03333333-3333-3333-3333-333333333333', nama_option: 'No Onion', tambahan_harga: 0, menu_id: 'e4b77437-ef3c-48a4-9176-4052fe8da0d3' },
            { mo_id: '04444444-4444-4444-4444-444444444444', nama_option: 'Add Egg', tambahan_harga: 6000, menu_id: '72c5d903-e822-4eb7-a745-dc85f67750e3' },
            { mo_id: '05555555-5555-5555-5555-555555555555', nama_option: 'Extra Sauce', tambahan_harga: 1000, menu_id: 'c1a3f916-4a1f-4936-82a9-3f6f22a04f4e' }
        ].map(o => ({ ...o, createdAt: new Date(), updatedAt: new Date() }));

        await queryInterface.bulkInsert('MenuOption', options);

        const orderMenuOptions = [
            { omo_id: uuidv4(), om_id: 'aa000001-0000-0000-0000-000000000001', mo_id: '02222222-2222-2222-2222-222222222222' },
            { omo_id: uuidv4(), om_id: 'aa000001-0000-0000-0000-000000000002', mo_id: '04444444-4444-4444-4444-444444444444' },
            { omo_id: uuidv4(), om_id: 'aa000001-0000-0000-0000-000000000003', mo_id: '01111111-1111-1111-1111-111111111111' },
            { omo_id: uuidv4(), om_id: 'aa000001-0000-0000-0000-000000000004', mo_id: '05555555-5555-5555-5555-555555555555' }
        ].map(o => ({ ...o, createdAt: new Date(), updatedAt: new Date() }));

        await queryInterface.bulkInsert('OrderMenuOption', orderMenuOptions);
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('OrderMenuOption', null, {});
        await queryInterface.bulkDelete('MenuOption', null, {});
    }
};