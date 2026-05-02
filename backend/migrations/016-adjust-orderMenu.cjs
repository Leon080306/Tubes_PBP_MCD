'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.removeColumn('OrderMenu', 'mo_id');

        await queryInterface.createTable('OrderMenuOption', {
            omo_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            om_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'OrderMenu',
                    key: 'om_id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            mo_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'MenuOption',
                    key: 'mo_id',
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

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('OrderMenuOption');

        await queryInterface.addColumn('OrderMenu', 'mo_id', {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: 'MenuOption',
                key: 'mo_id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        });
    },
};