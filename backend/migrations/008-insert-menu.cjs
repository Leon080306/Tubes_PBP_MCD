'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Menu', [
            {
                menu_id: Sequelize.literal('gen_random_uuid()'),
                nama: 'Burger Beef',
                harga_awal: 25000,
                kategori_menu: 'Makanan',
                tipe_menu: 'Ala Carte',
                gambarUrl: 'burger.jpg',
                isAvailable: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                menu_id: Sequelize.literal('gen_random_uuid()'),
                nama: 'Paket Ayam',
                harga_awal: 35000,
                kategori_menu: 'Makanan',
                tipe_menu: 'Paket',
                gambarUrl: 'ayam.jpg',
                isAvailable: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                menu_id: Sequelize.literal('gen_random_uuid()'),
                nama: 'Ice Tea',
                harga_awal: 10000,
                kategori_menu: 'Makanan',
                tipe_menu: 'Ala Carte',
                gambarUrl: 'icetea.jpg',
                isAvailable: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Menu', null, {});
    }
};