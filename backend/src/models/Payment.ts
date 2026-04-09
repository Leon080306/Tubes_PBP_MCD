import { Table, Column, Model, DataType, PrimaryKey, BelongsTo, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import { Order } from './Order.js';

@Table({
    tableName: 'Payment',
    timestamps: true,
    paranoid: true,
})
export class Payment extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    declare payment_id: string;

    @Column({
        type: DataType.ENUM('Cash', 'Card', 'Qris'),
        allowNull: false,
    })
    metode_pembayaran!: 'Cash' | 'Card' | 'Qris';

    @Column({
        type: DataType.ENUM('Completed', 'Canceled'),
        allowNull: false,
    })
    status!:'Completed' | 'Canceled';

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    paid_at!: Date;

    @Column({
        type: DataType.UUIDV4,
        allowNull: false,
    })
    order_id!: string;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @DeletedAt
    declare deletedAt: Date;

    @BelongsTo(() => Order, 'order_id')
    order!: Order;
}