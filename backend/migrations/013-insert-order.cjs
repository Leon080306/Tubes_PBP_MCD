'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Order', [
            {
                order_id: '550e8400-e29b-41d4-a716-446655440001',
                waktu_pesanan: new Date(),
                total_harga: 42000, 
                order_type: 'Dine-in',
                order_no: 1,
                status: 'Done'
            },
            {
                order_id: '550e8400-e29b-41d4-a716-446655440002',
                waktu_pesanan: new Date(),
                total_harga: 108000, 
                order_type: 'Takeaway',
                order_no: 2,
                status: 'Paid'
            },
            {
                order_id: '550e8400-e29b-41d4-a716-446655440003',
                waktu_pesanan: new Date(),
                total_harga: 34000, 
                order_type: 'Dine-in',
                order_no: 3,
                status: 'Process'
            },
            {
                order_id: '550e8400-e29b-41d4-a716-446655440004',
                waktu_pesanan: new Date(),
                total_harga: 21000, 
                order_type: 'Takeaway',
                order_no: 4,
                status: 'Canceled'
            },
        ].map(o => ({
            ...o,
            createdAt: new Date(),
            updatedAt: new Date()
        })));
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Order', null, {});
    }
};