'use strict';

/** @type {import('sequelize-cli').Migration} */
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

        await queryInterface.addColumn('OrderMenu', 'order_id', {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            references: { 
                model: 'Order',
                key: 'order_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        })

        await queryInterface.addColumn('OrderMenu', 'menu_id', {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            references: { 
                model: 'Menu',
                key: 'menu_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        })

        await queryInterface.addColumn('OrderMenu', 'mv_id', {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            references: { 
                model: 'MenuVarian',
                key: 'mv_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        })

        await queryInterface.addColumn('OrderMenu', 'mo_id', {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            references: { 
                model: 'MenuOption',
                key: 'mo_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        })
    },

    async down(queryInterface, Sequelize) {
         await queryInterface.removeColumn('OrderMenu', 'order_id')
         await queryInterface.removeColumn('OrderMenu', 'menu_id')
         await queryInterface.removeColumn('OrderMenu', 'mv_id')
         await queryInterface.removeColumn('OrderMenu', 'mo_id')
        await queryInterface.dropTable('OrderMenu');
    }
};