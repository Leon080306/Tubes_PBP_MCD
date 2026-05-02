import { Table, Column, Model, DataType, PrimaryKey, HasMany, CreatedAt, UpdatedAt, DeletedAt, HasOne } from 'sequelize-typescript';
import { OrderMenu } from './OrderMenu';
import { Payment } from './Payment';

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
    declare waktu_pesanan: Date;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare total_harga: number;

    @Column({
        type: DataType.ENUM('Dine-in', 'Takeaway'),
        allowNull: false,
    })
    declare order_type: 'Dine-in' | 'Takeaway';

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare order_no: number;

    @Column({
        type: DataType.ENUM('Paid', 'Process', 'Done', 'Canceled'),
        allowNull: false,
    })
    declare status: 'Paid' | 'Process' | 'Done' | 'Canceled';

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