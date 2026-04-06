import { Table, Column, Model, DataType, PrimaryKey, HasMany, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import { OrderMenu } from './OrderMenu';

@Table({
    tableName: 'Order',
    timestamps: true,
    paranoid: true
})

export class Order extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    declare order_id: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    waktu_pesanan!: Date;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    total_harga!: number;

    @Column({
        type: DataType.ENUM('Dine-in', 'Takeaway'),
        allowNull: false,
    })
    order_type!: 'Dine-in' | 'Takeaway';

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    order_no!: number;

    @Column({
        type: DataType.ENUM('Cart', 'Paid', 'Process', 'Done', 'Canceled'),
        allowNull: false,
    })
    status!: 'Cart' | 'Paid' | 'Process' | 'Done' | 'Canceled';

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @DeletedAt
    declare deletedAt: Date;

    @HasMany(() => OrderMenu, 'order_id')
    orderMenus!: OrderMenu[];

    @HasOne(() => Payment, 'order_id')
    payments!: Payment;

}