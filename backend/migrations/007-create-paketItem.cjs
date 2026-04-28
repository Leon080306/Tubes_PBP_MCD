'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('PaketItem', {
            pi_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            // ✅ All FKs inside createTable
            paket_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Menu',
                    key: 'menu_id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            item_menu_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Menu',
                    key: 'menu_id',
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

    async down(queryInterface) {
        await queryInterface.dropTable('PaketItem');
    },
};