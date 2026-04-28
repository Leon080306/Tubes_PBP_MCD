'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = [
      { category_id: '4f92d8e1-6b3a-4c2d-9e1a-5b8f7a6c5d4b', name: 'Burger', sort_order: 0 },
      { category_id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', name: 'Drinks', sort_order: 1 },
      { category_id: 'f7e6d5c4-b3a2-1a0b-9c8d-7e6f5a4b3c2d', name: 'Dessert', sort_order: 2 },
      { category_id: 'b8c9d0a1-e2f3-4b5c-6d7e-8f9a0b1c2d3e', name: 'Happy Meal', sort_order: 3 },
      { category_id: 'd4c3b2a1-0e9f-8d7c-6b5a-4f3e2d1c0b9a', name: 'Camilan', sort_order: 4 },
      { category_id: '5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d', name: 'Paket HeBat', sort_order: 5 },
      { category_id: 'e9f8d7c6-b5a4-3f2e-1d0c-9b8a7f6e5d4c', name: 'PaMer', sort_order: 6 },
      { category_id: '2d3e4f5a-6b7c-8d9e-0f1a-2b3c4d5e6f7a', name: 'PaNas', sort_order: 7 },
      { category_id: 'c0b1a293-8475-6d5e-4c3b-2a10f9e8d7c6', name: 'Ayam', sort_order: 8 }
    ].map(c => ({ 
      ...c, 
      createdAt: new Date(), 
      updatedAt: new Date(),
      deletedAt: null 
    }));

    await queryInterface.bulkInsert('Category', categories);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Category', null, {});
  }
};