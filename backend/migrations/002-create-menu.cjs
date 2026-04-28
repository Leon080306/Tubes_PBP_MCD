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
            // kategori_menu: {
            //     type: Sequelize.ENUM('Burger', 'Drinks', 'Dessert', 'Happy Meal', 'Camilan', 'Paket HeBat', 'PaMer', 'PaNas', 'Ayam'),
            //     allowNull: false,
            // },
            tipe_menu: {
                type: Sequelize.ENUM('Ala Carte', 'Paket'),
                allowNull: false,
            },
            gambarUrl: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            isAvailable: {
                type: Sequelize.BOOLEAN,
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

        await queryInterface.addColumn('Menu', 'category_id', {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            references: { 
                model: 'Category',
                key: 'category_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Category', 'category_id')
        await queryInterface.dropTable('Menu');
    }
};