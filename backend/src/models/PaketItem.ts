import { Table, Column, Model, DataType, PrimaryKey, BelongsTo, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import { Menu } from './Menu.js'


@Table({
    tableName: 'PaketItem',
    timestamps: true,
    paranoid: true
})

export class PaketItem extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    declare pi_id: string;

    @Column({
        type: DataType.UUIDV4,
        allowNull: false,
    })
    declare paket_id: string;

    @Column({
        type: DataType.UUIDV4,
        allowNull: false,
    })
    declare item_menu_id: string;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @DeletedAt
    declare deletedAt: Date;

    @BelongsTo(() => Menu, 'paket_id')
    pakets!: Menu;

    @BelongsTo(() => Menu, 'item_menu_id')
    items!: Menu;
}

