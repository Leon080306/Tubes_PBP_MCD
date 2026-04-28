import { Table, Column, Model, DataType, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt, HasMany } from 'sequelize-typescript';
import { Menu } from './Menu'; 

@Table({
    tableName: 'Category',
    timestamps: true,
    paranoid: true,
})
export class Category extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    declare category_id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    sort_order!: number;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @DeletedAt
    declare deletedAt: Date;

    @HasMany(() => Menu, 'category_id')
    menus!: Menu[];
}