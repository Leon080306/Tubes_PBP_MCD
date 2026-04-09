import { Table, Column, Model, DataType, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt, HasMany } from 'sequelize-typescript';
import { MenuVarian } from './MenuVarian';
import { MenuOption } from './MenuOption';
import { PaketItem } from './PaketItem';
import { OrderMenu } from './OrderMenu';

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
        type: DataType.STRING,
        allowNull: false,
    })
    nama!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    harga_awal!: number;

    @Column({
        type: DataType.ENUM('Makanan', 'Minuman', 'Dessert'),
        allowNull: false,
    })
    kategori_menu!: 'Makanan' | 'Minuman' | 'Dessert';

    @Column({
        type: DataType.ENUM('Ala Carte', 'Paket'),
        allowNull: false,
    })
    tipe_menu!: 'Ala Carte' | 'Paket';

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    gambarUrl!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    isAvailable!: string;

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
}