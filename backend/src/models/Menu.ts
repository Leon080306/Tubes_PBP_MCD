import { Table, Column, Model, DataType, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt, HasMany, BelongsTo } from 'sequelize-typescript';
import { MenuVarian } from './MenuVarian';
import { MenuOption } from './MenuOption';
import { PaketItem } from './PaketItem';
import { OrderMenu } from './OrderMenu';
import { Category } from './Category';

@Table({
    tableName: 'Menu',
    timestamps: true,
    paranoid: true,
})
export class Menu extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    declare menu_id: string;

    @Column({
        type: DataType.UUIDV4,
        allowNull: false,
    })
    declare category_id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare nama: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare harga_awal: number;

    @Column({
        type: DataType.ENUM('Ala Carte', 'Paket'),
        allowNull: false,
    })
    declare tipe_menu: 'Ala Carte' | 'Paket';

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare gambarUrl: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare isAvailable: string;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @DeletedAt
    declare deletedAt: Date;

    @HasMany(() => MenuVarian, 'menu_id')
    mvs!: MenuVarian[];

    @HasMany(() => MenuOption, 'menu_id')
    mos!: MenuOption[];

    @HasMany(() => PaketItem, 'menu_id')
    pakets!: PaketItem[];

    @HasMany(() => OrderMenu, 'menu_id')
    orderMenus!: OrderMenu[];

    @BelongsTo(() => Category, 'category_id')
    category!: Category;
}