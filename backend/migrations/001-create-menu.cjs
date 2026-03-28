'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Menu', {
            menu_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            nama: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            harga_awal: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            kategori_menu: {
                type: Sequelize.ENUM('Makanan', 'Minuman', 'Dessert'),
                allowNull: false,
            },
            tipe_menu: {
                type: Sequelize.ENUM('Ala Carte', 'Paket'),
                allowNull: false,
            },
            gambarUrl: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            isAvailable: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },

            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },

            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Menu');
    }
};