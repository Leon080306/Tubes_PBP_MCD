'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('OrderMenu', {
            om_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            harga_awal: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            // ✅ All FKs inside createTable, no defaultValue
            order_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Order',
                    key: 'order_id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            menu_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Menu',
                    key: 'menu_id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            mv_id: {
                type: Sequelize.UUID,
                allowNull: true,  // ⚠️ Consider: can an order item have NO variant?
                references: {
                    model: 'MenuVarian',
                    key: 'mv_id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            mo_id: {
                type: Sequelize.UUID,
                allowNull: true,  // ⚠️ Consider: can an order item have NO option?
                references: {
                    model: 'MenuOption',
                    key: 'mo_id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
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
        await queryInterface.dropTable('OrderMenu');
    },
};