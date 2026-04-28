'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('MenuVarian', {
            mv_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            nama_varian: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            harga_tambahan: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false,
            },
            // ✅ FK inside createTable
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
        await queryInterface.dropTable('MenuVarian');
    },
};