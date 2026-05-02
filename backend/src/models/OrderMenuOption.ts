import { Table, Column, Model, DataType, PrimaryKey, BelongsTo, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import { OrderMenu } from './OrderMenu.js';
import { MenuOption } from './MenuOption.js';

@Table({ tableName: 'OrderMenuOption', timestamps: true })
export class OrderMenuOption extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false
    })
    declare omo_id: string;

    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    declare om_id: string;

    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    declare mo_id: string;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @DeletedAt
    declare deletedAt: Date;

    @BelongsTo(() => OrderMenu, 'om_id')
    orderMenu!: OrderMenu;

    @BelongsTo(() => MenuOption, 'mo_id')
    menuOption!: MenuOption;
}