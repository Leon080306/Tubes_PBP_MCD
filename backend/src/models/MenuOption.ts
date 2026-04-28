import { Table, Column, Model, DataType, PrimaryKey, BelongsTo, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import { Menu } from './Menu.js';


@Table({
    tableName: 'MenuOption',
    timestamps: true,
})

export class MenuOption extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    declare mo_id: string;

    @Column({
        type: DataType.UUIDV4,
        allowNull: false,
    })
    declare menu_id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare nama_option: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare tambahan_harga: number;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @DeletedAt
    declare deletedAt: Date;

    @BelongsTo(() => Menu, 'menu_id')
    menus!: Menu;
}