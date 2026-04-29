'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const menus = [
      { menu_id: '1e454cb6-56b8-4bf2-ac74-213014fbe310', nama: 'Beef Burger Deluxe', harga_awal: 35000, category_id: '4f92d8e1-6b3a-4c2d-9e1a-5b8f7a6c5d4b', tipe_menu: 'Ala Carte', gambarUrl: 'burger/beef burger deluxe.webp' },
      { menu_id: '45a9e055-b3fa-4d0b-8f67-f0813ac6340e', nama: 'Beef Burger', harga_awal: 30000, category_id: '4f92d8e1-6b3a-4c2d-9e1a-5b8f7a6c5d4b', tipe_menu: 'Ala Carte', gambarUrl: 'burger/beef burger.webp' },
      { menu_id: 'e4b77437-ef3c-48a4-9176-4052fe8da0d3', nama: 'Big Mac', harga_awal: 38000, category_id: '4f92d8e1-6b3a-4c2d-9e1a-5b8f7a6c5d4b', tipe_menu: 'Ala Carte', gambarUrl: 'burger/bigmac.webp' },
      { menu_id: 'bd4df05b-e4c6-4f30-96c7-ce92a362e60f', nama: 'Cheeseburger Deluxe', harga_awal: 35000, category_id: '4f92d8e1-6b3a-4c2d-9e1a-5b8f7a6c5d4b', tipe_menu: 'Ala Carte', gambarUrl: 'burger/cheeseburger deluxe.webp' },
      { menu_id: '03f62235-ad1f-4331-a654-023eb4e8a6c3', nama: 'Cheeseburger', harga_awal: 30000, category_id: '4f92d8e1-6b3a-4c2d-9e1a-5b8f7a6c5d4b', tipe_menu: 'Ala Carte', gambarUrl: 'burger/cheeseburger.webp' },
      { menu_id: 'ac5ab928-8608-4761-aafb-3b9e5e09273f', nama: 'Double Big Mac', harga_awal: 45000, category_id: '4f92d8e1-6b3a-4c2d-9e1a-5b8f7a6c5d4b', tipe_menu: 'Ala Carte', gambarUrl: 'burger/double bigmac.webp' },
      { menu_id: '54ca7789-15a1-49a1-b24f-4779fb30acf9', nama: 'Double Cheeseburger', harga_awal: 40000, category_id: '4f92d8e1-6b3a-4c2d-9e1a-5b8f7a6c5d4b', tipe_menu: 'Ala Carte', gambarUrl: 'burger/double cheeseburger.webp' },
      { menu_id: '401c2d91-3e23-4a11-ae3a-b02c8f741f9b', nama: 'Fish Fillet Burger', harga_awal: 35000, category_id: '4f92d8e1-6b3a-4c2d-9e1a-5b8f7a6c5d4b', tipe_menu: 'Ala Carte', gambarUrl: 'burger/fish fillet burger.webp' },
      { menu_id: '5c39528a-931c-43b9-a932-8ac304919362', nama: 'Triple Cheeseburger', harga_awal: 50000, category_id: '4f92d8e1-6b3a-4c2d-9e1a-5b8f7a6c5d4b', tipe_menu: 'Ala Carte', gambarUrl: 'burger/triple cheeseburger.webp' },
      { menu_id: '8cc1a1ce-2144-4721-80af-4089098934e0', nama: 'coba', harga_awal: 10000, category_id: '4f92d8e1-6b3a-4c2d-9e1a-5b8f7a6c5d4b', tipe_menu: 'Ala Carte', gambarUrl: 'burger/beef burger deluxe.webp' },
      { menu_id: 'c6a3dca7-9063-41f4-a746-ef96ac482a0e', nama: 'cobain', harga_awal: 25000, category_id: '4f92d8e1-6b3a-4c2d-9e1a-5b8f7a6c5d4b', tipe_menu: 'Ala Carte', gambarUrl: 'coba.jpg' },
      { menu_id: '0b597e9f-3aa3-48b6-8866-4f68c04d3168', nama: 'Mineral Water', harga_awal: 10000, category_id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', tipe_menu: 'Ala Carte', gambarUrl: 'drinks/mineral water.png' },
      { menu_id: 'c399f236-86dd-40da-950e-791931a23812', nama: 'Hot Coffee', harga_awal: 15000, category_id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', tipe_menu: 'Ala Carte', gambarUrl: 'drinks/hot coffee.webp' },
      { menu_id: '5e245495-400e-494d-92a0-dc1075e69590', nama: 'Iced Coffee', harga_awal: 15000, category_id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', tipe_menu: 'Ala Carte', gambarUrl: 'drinks/iced coffee.webp' },
      { menu_id: '4713c75a-a981-424d-8643-4e57aaa3cd14', nama: 'Sprite', harga_awal: 12000, category_id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', tipe_menu: 'Ala Carte', gambarUrl: 'drinks/sprite.png' },
      { menu_id: 'a3342e43-e7f2-41c6-a5e1-acfc5fe11b37', nama: 'Fanta', harga_awal: 12000, category_id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', tipe_menu: 'Ala Carte', gambarUrl: 'drinks/fanta.png' },
      { menu_id: 'f99a463b-9bd6-4b95-8713-d508de453fa6', nama: 'Coca Cola', harga_awal: 12000, category_id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', tipe_menu: 'Ala Carte', gambarUrl: 'drinks/coca cola.png' },
      { menu_id: '24982a06-de8c-4b49-a187-b33ab5e479eb', nama: 'McFlurry Oreo', harga_awal: 20000, category_id: 'f7e6d5c4-b3a2-1a0b-9c8d-7e6f5a4b3c2d', tipe_menu: 'Ala Carte', gambarUrl: 'dessert/mcflurry oreo.webp' },
      { menu_id: '247c80d7-305c-4ecc-9958-fa798b886515', nama: 'Apple Pie', harga_awal: 15000, category_id: 'f7e6d5c4-b3a2-1a0b-9c8d-7e6f5a4b3c2d', tipe_menu: 'Ala Carte', gambarUrl: 'dessert/apple pie.webp' },
      { menu_id: '19e4d1f6-78bf-4797-8696-4d93a208f3df', nama: 'Chocolate Sundae', harga_awal: 18000, category_id: 'f7e6d5c4-b3a2-1a0b-9c8d-7e6f5a4b3c2d', tipe_menu: 'Ala Carte', gambarUrl: 'dessert/chocolate sundae.png' },
      { menu_id: '4ec01bf5-36a4-4db4-b4aa-b8b27b16142e', nama: 'Dark Choco McFlurry', harga_awal: 20000, category_id: 'f7e6d5c4-b3a2-1a0b-9c8d-7e6f5a4b3c2d', tipe_menu: 'Ala Carte', gambarUrl: 'dessert/dark choco mcflurry.webp' },
      { menu_id: 'e093d23b-0f29-4064-8ef0-be487047c87f', nama: 'Ice Cream Cone', harga_awal: 12000, category_id: 'f7e6d5c4-b3a2-1a0b-9c8d-7e6f5a4b3c2d', tipe_menu: 'Ala Carte', gambarUrl: 'dessert/ice cream cone.png' },
      { menu_id: '3fa36bf2-f3e1-4192-bfb2-511bff587bf6', nama: 'Strawberry Sundae', harga_awal: 18000, category_id: 'f7e6d5c4-b3a2-1a0b-9c8d-7e6f5a4b3c2d', tipe_menu: 'Ala Carte', gambarUrl: 'dessert/strawberry sundae.png' },
      { menu_id: 'f60cf530-49f4-4d7f-b39d-e75e8652573b', nama: 'Happy Meal Beef Burger', harga_awal: 42000, category_id: 'b8c9d0a1-e2f3-4b5c-6d7e-8f9a0b1c2d3e', tipe_menu: 'Paket', gambarUrl: 'happy meal/Happy Meal Beef Burger.webp' },
      { menu_id: '26a66c17-c993-4fc4-b5dd-e2dffcc00fbe', nama: 'Happy Meal 4 pcs', harga_awal: 45000, category_id: 'b8c9d0a1-e2f3-4b5c-6d7e-8f9a0b1c2d3e', tipe_menu: 'Paket', gambarUrl: 'happy meal/Happy Meal 4 pcs McNuggets.webp' },
      { menu_id: 'df9e18ff-d31e-4561-875d-df283bb6abcd', nama: 'Happy Meal Ayam', harga_awal: 40000, category_id: 'b8c9d0a1-e2f3-4b5c-6d7e-8f9a0b1c2d3e', tipe_menu: 'Paket', gambarUrl: 'happy meal/Happy Meal Ayam McD.webp' },
      { menu_id: 'c1a3f916-4a1f-4936-82a9-3f6f22a04f4e', nama: 'French Fries', harga_awal: 20000, category_id: 'd4c3b2a1-0e9f-8d7c-6b5a-4f3e2d1c0b9a', tipe_menu: 'Ala Carte', gambarUrl: 'camilan/french fries.webp' },
      { menu_id: '156009a8-d285-436c-b37c-9e2599a5bf3a', nama: 'Chicken Snack Wrap', harga_awal: 25000, category_id: 'd4c3b2a1-0e9f-8d7c-6b5a-4f3e2d1c0b9a', tipe_menu: 'Ala Carte', gambarUrl: 'camilan/chicken snack wrap.webp' },
      { menu_id: 'b56b48b9-d9ee-4bdf-9fea-581a39e687ca', nama: 'Ayam Spicy McD', harga_awal: 28000, category_id: 'd4c3b2a1-0e9f-8d7c-6b5a-4f3e2d1c0b9a', tipe_menu: 'Ala Carte', gambarUrl: 'ayam ala carte/ayam spicy.webp' },
      { menu_id: 'ed8ddd71-3a56-4aca-8c0d-096611ac6f71', nama: 'Spicy Chicken Bites', harga_awal: 27000, category_id: 'd4c3b2a1-0e9f-8d7c-6b5a-4f3e2d1c0b9a', tipe_menu: 'Ala Carte', gambarUrl: 'camilan/spicy chicken bites.webp' },
      { menu_id: '58a5f1ce-16f2-4fe4-afc4-c7da6334085c', nama: 'McSpaghetti', harga_awal: 28000, category_id: 'd4c3b2a1-0e9f-8d7c-6b5a-4f3e2d1c0b9a', tipe_menu: 'Ala Carte', gambarUrl: 'camilan/mcspaghetti.png' },
      { menu_id: 'af5c2c58-a1fd-4c34-838c-9935ee98641f', nama: 'Korean Soy Garlic Chicken', harga_awal: 32000, category_id: 'd4c3b2a1-0e9f-8d7c-6b5a-4f3e2d1c0b9a', tipe_menu: 'Ala Carte', gambarUrl: 'ayam ala carte/korean soy garlic.webp' },
      { menu_id: '348f645d-0018-4d70-97da-8f6e805caead', nama: 'McNuggets', harga_awal: 30000, category_id: 'd4c3b2a1-0e9f-8d7c-6b5a-4f3e2d1c0b9a', tipe_menu: 'Ala Carte', gambarUrl: 'camilan/mcnuggets.webp' },
      { menu_id: 'e5ea3ff5-fbce-4b61-9d2a-1764b574b2e4', nama: 'Ayam Krispy McD', harga_awal: 28000, category_id: 'd4c3b2a1-0e9f-8d7c-6b5a-4f3e2d1c0b9a', tipe_menu: 'Ala Carte', gambarUrl: 'ayam ala carte/ayam krispy.webp' },
      { menu_id: '2c4d0f4d-ad18-4d0e-8698-efed5b616c7e', nama: 'Paket Hebat McSpaghetti', harga_awal: 40000, category_id: '5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d', tipe_menu: 'Paket', gambarUrl: 'paket hebat/paket hebat - mcspaghetti.webp' },
      { menu_id: '2c81608a-c5fb-47d2-83e3-13363e369c72', nama: 'Paket Hebat Chicken', harga_awal: 36000, category_id: '5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d', tipe_menu: 'Paket', gambarUrl: 'paket hebat/Paket HeBat - Chicken Burger Deluxe.png' },
      { menu_id: 'ba32bb03-1dec-49af-9a02-1902300bf402', nama: 'Paket Hebat Korean Soy Garlic Wings', harga_awal: 38000, category_id: '5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d', tipe_menu: 'Paket', gambarUrl: 'paket hebat/Paket HeBat - Korean Soy Garlic Wings.png' },
      { menu_id: '0ada7056-35c5-43ce-9788-a331f4a2f894', nama: 'Paket Hebat McSpaghetti Ayam (Krispy)', harga_awal: 40000, category_id: '5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d', tipe_menu: 'Paket', gambarUrl: 'paket hebat/Paket HeBat McSpaghetti Ayam (Krispy).png' },
      { menu_id: '8e3c0544-b36e-4e04-91da-2eed13bb0f1d', nama: 'Paket Hebat McSpaghetti Ayam (Spicy)', harga_awal: 40000, category_id: '5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d', tipe_menu: 'Paket', gambarUrl: 'paket hebat/Paket HeBat McSpaghetti Ayam (Spicy).png' },
      { menu_id: '12d13276-56d6-4db4-b843-95edad1d5d80', nama: 'Paket Hebat Cheeseburger', harga_awal: 35000, category_id: '5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d', tipe_menu: 'Paket', gambarUrl: 'paket hebat/paket hebat - cheeseburgerdeluxe.png' },
      { menu_id: '771ec83a-1f0b-4fd9-9ce2-71903176878b', nama: 'PaMer 7', harga_awal: 65000, category_id: 'e9f8d7c6-b5a4-3f2e-1d0c-9b8a7f6e5d4c', tipe_menu: 'Paket', gambarUrl: 'PaMer/PaMer 7.webp' },
      { menu_id: '83c85842-2b5e-4026-be49-cb41b692a44f', nama: 'PaMer 5', harga_awal: 50000, category_id: 'e9f8d7c6-b5a4-3f2e-1d0c-9b8a7f6e5d4c', tipe_menu: 'Paket', gambarUrl: 'PaMer/PaMer 5.webp' },
      { menu_id: '2e85de04-7655-458f-97f8-c1732875a0dd', nama: 'PaNas Special', harga_awal: 45000, category_id: '2d3e4f5a-6b7c-8d9e-0f1a-2b3c4d5e6f7a', tipe_menu: 'Paket', gambarUrl: 'PaNas/PaNas Special.webp' },
      { menu_id: '3690d545-0154-432f-917e-80aceab6d527', nama: 'PaNas 2 with Rice', harga_awal: 36000, category_id: '2d3e4f5a-6b7c-8d9e-0f1a-2b3c4d5e6f7a', tipe_menu: 'Paket', gambarUrl: 'PaNas/PaNas 2 with Rice.webp' },
      { menu_id: '72c5d903-e822-4eb7-a745-dc85f67750e3', nama: 'PaNas 1', harga_awal: 30000, category_id: '2d3e4f5a-6b7c-8d9e-0f1a-2b3c4d5e6f7a', tipe_menu: 'Paket', gambarUrl: 'PaNas/PaNas 1.webp' },
      { menu_id: 'f1420233-a7b3-42d2-accb-d823235c4298', nama: 'PaNas 2 with Fries', harga_awal: 35000, category_id: '2d3e4f5a-6b7c-8d9e-0f1a-2b3c4d5e6f7a', tipe_menu: 'Paket', gambarUrl: 'PaNas/PaNas 2 with Fries.webp' },
      { menu_id: 'af962f48-4df4-4f24-95fa-1e6b5e595cfe', nama: 'Ayam Spicy McD', harga_awal: 28000, category_id: 'c0b1a293-8475-6d5e-4c3b-2a10f9e8d7c6', tipe_menu: 'Ala Carte', gambarUrl: 'ayam ala carte/ayam spicy.webp' },
      { menu_id: 'a9614bec-9688-421a-8757-6077c01daf9c', nama: 'Ayam Krispy McD', harga_awal: 28000, category_id: 'c0b1a293-8475-6d5e-4c3b-2a10f9e8d7c6', tipe_menu: 'Ala Carte', gambarUrl: 'ayam ala carte/ayam krispy.webp' },
      { menu_id: 'c279abda-aa4d-4b5e-81df-c184820b73e5', nama: 'Korean Soy Garlic Chicken', harga_awal: 32000, category_id: 'c0b1a293-8475-6d5e-4c3b-2a10f9e8d7c6', tipe_menu: 'Ala Carte', gambarUrl: 'ayam ala carte/korean soy garlic.webp' }
    ].map(item => ({
      ...item,
      isAvailable: true,
      createdAt: new Date('2026-04-13'),
      updatedAt: new Date('2026-04-13')
    }));

    return queryInterface.bulkInsert('Menu', menus);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Menu', null, {});
  }
};