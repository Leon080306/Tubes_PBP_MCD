'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const menus = [
      // --- CATEGORY: CHICKEN ---
      { nama: 'PaNas 1', harga_awal: 35000, kategori_menu: 'Chicken', gambarUrl: 'assets/panas1.png' },
      { nama: 'PaNas 2', harga_awal: 48000, kategori_menu: 'Chicken', gambarUrl: 'assets/panas2.png' },
      { nama: 'PaNas Special', harga_awal: 42000, kategori_menu: 'Chicken', gambarUrl: 'assets/panas_special.png' },
      { nama: 'McNuggets 6pcs', harga_awal: 32000, kategori_menu: 'Chicken', gambarUrl: 'assets/mcnuggets.png' },
      
      // --- CATEGORY: BURGERS ---
      { nama: 'Big Mac', harga_awal: 45000, kategori_menu: 'Burgers', gambarUrl: 'assets/bigmac.png' },
      { nama: 'Double Cheeseburger', harga_awal: 39000, kategori_menu: 'Burgers', gambarUrl: 'assets/double_cheeseburger.png' },
      { nama: 'McChicken', harga_awal: 33000, kategori_menu: 'Burgers', gambarUrl: 'assets/mcchicken.png' },
      { nama: 'McSpicy', harga_awal: 41000, kategori_menu: 'Burgers', gambarUrl: 'assets/mcspicy.png' },
      { nama: 'Cheeseburger', harga_awal: 30000, kategori_menu: 'Burgers', gambarUrl: 'assets/cheeseburger.png' },

      // --- CATEGORY: SNACKS ---
      { nama: 'French Fries Large', harga_awal: 25000, kategori_menu: 'Snacks', gambarUrl: 'assets/fries_l.png' },
      { nama: 'French Fries Medium', harga_awal: 20000, kategori_menu: 'Snacks', gambarUrl: 'assets/fries_m.png' },

      // --- CATEGORY: DESSERTS ---
      { nama: 'McFlurry Oreo', harga_awal: 15000, kategori_menu: 'Desserts', gambarUrl: 'assets/mcflurry_oreo.png' },
      { nama: 'Apple Pie', harga_awal: 12000, kategori_menu: 'Desserts', gambarUrl: 'assets/apple_pie.png' },
      { nama: 'Choco Sundae', harga_awal: 14000, kategori_menu: 'Desserts', gambarUrl: 'assets/choco_sundae.png' },

      // --- CATEGORY: DRINKS ---
      { nama: 'Coca-Cola', harga_awal: 12000, kategori_menu: 'Drinks', gambarUrl: 'assets/coke.png' },
      { nama: 'Iced Lemon Tea', harga_awal: 14000, kategori_menu: 'Drinks', gambarUrl: 'assets/lemon_tea.png' },
      { nama: 'Orange Juice', harga_awal: 18000, kategori_menu: 'Drinks', gambarUrl: 'assets/orange_juice.png' },

      // --- CATEGORY: BREAKFAST ---
      { nama: 'Egg McMuffin', harga_awal: 28000, kategori_menu: 'Breakfast', gambarUrl: 'assets/egg_mcmuffin.png' },
      { nama: 'Chicken Muffin', harga_awal: 26000, kategori_menu: 'Breakfast', gambarUrl: 'assets/chicken_muffin.png' }
    ].map(item => ({
      ...item,
      menu_id: uuidv4(), // Generate UUID otomatis
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    return queryInterface.bulkInsert('Menu', menus);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Menu', null, {});
  }
};