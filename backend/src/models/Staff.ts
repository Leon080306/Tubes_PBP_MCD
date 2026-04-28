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
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @Column({
        type: DataType.ENUM("Admin", "Cashier"),
        allowNull: false,
    })
    role!: "Admin" | "Cashier";

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @DeletedAt
    declare deletedAt: Date;
}