import { Table, Column, Model, DataType, PrimaryKey, BelongsTo, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import { Menu } from './Menu.js';


@Table({
    tableName: 'MenuVarian',
    timestamps: true,
})

export class MenuVarian extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    declare mv_id: string;

    @Column({
        type: DataType.UUIDV4,
        allowNull: false,
    })
    declare menu_id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare nama_varian: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare harga_tambahan: number;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @DeletedAt
    declare deletedAt: Date;

    @BelongsTo(() => Menu, 'menu_id')
    menus!: Menu;

}