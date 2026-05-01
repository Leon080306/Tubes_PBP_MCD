import { Table, Column, Model, DataType, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript";

@Table({
    tableName: "Staff",
    timestamps: true,
})

export class Staff extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    declare staff_id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare password: string;

    @Column({
        type: DataType.ENUM("Admin", "Cashier"),
        allowNull: false,
    })
    declare role: "Admin" | "Cashier";

    @Column({ type: DataType.STRING, allowNull: true })
    declare reset_token: string | null;

    @Column({ type: DataType.DATE, allowNull: true })
    declare reset_token_expiry: Date | null;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @DeletedAt
    declare deletedAt: Date;
}