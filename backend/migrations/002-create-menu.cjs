'use strict';

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
            // ✅ FK inside createTable, no defaultValue
            category_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Category',
                    key: 'category_id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        });
    },

    // ✅ Fixed: just dropTable is enough
    async down(queryInterface) {
        await queryInterface.dropTable('Menu');
    },
};