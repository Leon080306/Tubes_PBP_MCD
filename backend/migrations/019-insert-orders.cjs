'use strict';
const { v4: uuidv4 } = require('uuid');

const BIG_MAC = 'e4b77437-ef3c-48a4-9176-4052fe8da0d3';
const BEEF_BURGER_DELUXE = '1e454cb6-56b8-4bf2-ac74-213014fbe310';
const CHEESEBURGER = '03f62235-ad1f-4331-a654-023eb4e8a6c3';
const MCNUGGETS = '348f645d-0018-4d70-97da-8f6e805caead';
const FRENCH_FRIES = 'c1a3f916-4a1f-4936-82a9-3f6f22a04f4e';
const COCA_COLA = 'f99a463b-9bd6-4b95-8713-d508de453fa6';
const SPRITE = '4713c75a-a981-424d-8643-4e57aaa3cd14';
const HOT_COFFEE = 'c399f236-86dd-40da-950e-791931a23812';
const MCFLURRY_OREO = '24982a06-de8c-4b49-a187-b33ab5e479eb';

const orderPatterns = [
    // Pattern 1: Big Mac + French Fries + Coca Cola (5x)
    ...Array.from({ length: 5 }, (_, i) => ({
        order_no: 10001 + i,
        total_harga: 65000,
        order_type: 'Dine-in',
        items: [
            { menu_id: BIG_MAC, harga_awal: 38000 },
            { menu_id: FRENCH_FRIES, harga_awal: 20000 },
            { menu_id: COCA_COLA, harga_awal: 12000 },
        ],
    })),

    // Pattern 2: Big Mac + French Fries (3x)
    ...Array.from({ length: 3 }, (_, i) => ({
        order_no: 10006 + i,
        total_harga: 58000,
        order_type: 'Takeaway',
        items: [
            { menu_id: BIG_MAC, harga_awal: 38000 },
            { menu_id: FRENCH_FRIES, harga_awal: 20000 },
        ],
    })),

    // Pattern 3: McNuggets + French Fries + Coca Cola (4x)
    ...Array.from({ length: 4 }, (_, i) => ({
        order_no: 10009 + i,
        total_harga: 62000,
        order_type: 'Dine-in',
        items: [
            { menu_id: MCNUGGETS, harga_awal: 30000 },
            { menu_id: FRENCH_FRIES, harga_awal: 20000 },
            { menu_id: COCA_COLA, harga_awal: 12000 },
        ],
    })),

    // Pattern 4: Big Mac + Hot Coffee + McFlurry Oreo (2x)
    ...Array.from({ length: 2 }, (_, i) => ({
        order_no: 10013 + i,
        total_harga: 73000,
        order_type: 'Dine-in',
        items: [
            { menu_id: BIG_MAC, harga_awal: 38000 },
            { menu_id: HOT_COFFEE, harga_awal: 15000 },
            { menu_id: MCFLURRY_OREO, harga_awal: 20000 },
        ],
    })),

    // Pattern 5: Hot Coffee + McFlurry Oreo (3x)
    ...Array.from({ length: 3 }, (_, i) => ({
        order_no: 10015 + i,
        total_harga: 35000,
        order_type: 'Takeaway',
        items: [
            { menu_id: HOT_COFFEE, harga_awal: 15000 },
            { menu_id: MCFLURRY_OREO, harga_awal: 20000 },
        ],
    })),

    // Pattern 6: McNuggets + Coca Cola (2x)
    ...Array.from({ length: 2 }, (_, i) => ({
        order_no: 10018 + i,
        total_harga: 42000,
        order_type: 'Dine-in',
        items: [
            { menu_id: MCNUGGETS, harga_awal: 30000 },
            { menu_id: COCA_COLA, harga_awal: 12000 },
        ],
    })),

    // Pattern 7: Cheeseburger + French Fries + Sprite (3x)
    ...Array.from({ length: 3 }, (_, i) => ({
        order_no: 10020 + i,
        total_harga: 62000,
        order_type: 'Dine-in',
        items: [
            { menu_id: CHEESEBURGER, harga_awal: 30000 },
            { menu_id: FRENCH_FRIES, harga_awal: 20000 },
            { menu_id: SPRITE, harga_awal: 12000 },
        ],
    })),

    // Pattern 8: Beef Burger Deluxe + French Fries + Coca Cola (4x)
    ...Array.from({ length: 4 }, (_, i) => ({
        order_no: 10023 + i,
        total_harga: 67000,
        order_type: 'Takeaway',
        items: [
            { menu_id: BEEF_BURGER_DELUXE, harga_awal: 35000 },
            { menu_id: FRENCH_FRIES, harga_awal: 20000 },
            { menu_id: COCA_COLA, harga_awal: 12000 },
        ],
    })),
];

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const orders = [];
        const orderMenus = [];

        orderPatterns.forEach((pattern) => {
            const orderId = uuidv4();
            const now = new Date();

            orders.push({
                order_id: orderId,
                waktu_pesanan: now,
                total_harga: pattern.total_harga,
                order_type: pattern.order_type,
                order_no: pattern.order_no,
                status: 'Done',
                createdAt: now,
                updatedAt: now,
            });

            pattern.items.forEach((item) => {
                orderMenus.push({
                    om_id: uuidv4(),
                    order_id: orderId,
                    menu_id: item.menu_id,
                    mv_id: null,
                    quantity: 1,                 // ✅ TAMBAH INI
                    harga_awal: item.harga_awal,
                    createdAt: now,
                    updatedAt: now,
                });
            });
        });

        await queryInterface.bulkInsert('Order', orders);
        await queryInterface.bulkInsert('OrderMenu', orderMenus);
    },

    down: async (queryInterface, Sequelize) => {
        const orderNos = orderPatterns.map(p => p.order_no);

        await queryInterface.sequelize.query(`
            DELETE FROM "OrderMenu" 
            WHERE order_id IN (
                SELECT order_id FROM "Order" 
                WHERE order_no IN (${orderNos.join(',')})
            )
        `);

        await queryInterface.sequelize.query(`
            DELETE FROM "Order" 
            WHERE order_no IN (${orderNos.join(',')})
        `);
    }
};