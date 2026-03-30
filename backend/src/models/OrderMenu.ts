import { Table, Column, Model, DataType, PrimaryKey, BelongsTo, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import { Menu } from './Menu.js'
import { Order } from './Order.js'
import { MenuVarian } from './MenuVarian.js'
import { MenuOption } from './MenuOption.js'

@Table({
    tableName: 'OrderMenu',
    timestamps: true,
    paranoid: true
})

export class OrderMenu extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    declare om_id: string;

    @Column({
        type: DataType.UUIDV4,
        allowNull: false,
    })
    declare order_id: string;

    @Column({
        type: DataType.UUIDV4,
        allowNull: false,
    })
    declare menu_id: string;

    @Column({
        type: DataType.UUIDV4,
        allowNull: false,
    })
    declare mv_id: string;

    @Column({
        type: DataType.UUIDV4,
        allowNull: false,
    })
    declare mo_id: string;


    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    harga_awal!: number;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @DeletedAt
    declare deletedAt: Date;

    @BelongsTo(() => Menu, 'menu_id')
    menus!: Menu;

    @BelongsTo(() => MenuVarian, 'mv_id')
    mvs!: MenuVarian;

    @BelongsTo(() => MenuOption, 'mo_id')
    mod!: MenuOption;

    @BelongsTo(() => Order, 'order_id')
    orders!: Order;


}