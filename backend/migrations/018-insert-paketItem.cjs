'use strict';
const { v4: uuidv4 } = require('uuid');

// Ala Carte menu IDs
const BEEF_BURGER = '45a9e055-b3fa-4d0b-8f67-f0813ac6340e';
const CHEESEBURGER = '03f62235-ad1f-4331-a654-023eb4e8a6c3';
const CHICKEN_SNACK_WRAP = '156009a8-d285-436c-b37c-9e2599a5bf3a';
const MCSPAGHETTI = '58a5f1ce-16f2-4fe4-afc4-c7da6334085c';
const MCNUGGETS = '348f645d-0018-4d70-97da-8f6e805caead';
const KOREAN_SOY = 'af5c2c58-a1fd-4c34-838c-9935ee98641f';
const AYAM_KRISPY = 'e5ea3ff5-fbce-4b61-9d2a-1764b574b2e4';
const AYAM_SPICY = 'b56b48b9-d9ee-4bdf-9fea-581a39e687ca';
const FRENCH_FRIES = 'c1a3f916-4a1f-4936-82a9-3f6f22a04f4e';
const COCA_COLA = 'f99a463b-9bd6-4b95-8713-d508de453fa6';
const MINERAL_WATER = '0b597e9f-3aa3-48b6-8866-4f68c04d3168';
const MCFLURRY_OREO = '24982a06-de8c-4b49-a187-b33ab5e479eb';
const APPLE_PIE = '247c80d7-305c-4ecc-9958-fa798b886515';

// Paket menu IDs
const HAPPY_MEAL_BEEF = 'f60cf530-49f4-4d7f-b39d-e75e8652573b';
const HAPPY_MEAL_4PCS = '26a66c17-c993-4fc4-b5dd-e2dffcc00fbe';
const HAPPY_MEAL_AYAM = 'df9e18ff-d31e-4561-875d-df283bb6abcd';
const PAKET_HEBAT_SPAG = '2c4d0f4d-ad18-4d0e-8698-efed5b616c7e';
const PAKET_HEBAT_CHICK = '2c81608a-c5fb-47d2-83e3-13363e369c72';
const PAKET_HEBAT_KOREAN = 'ba32bb03-1dec-49af-9a02-1902300bf402';
const PAKET_HEBAT_SPAG_K = '0ada7056-35c5-43ce-9788-a331f4a2f894';
const PAKET_HEBAT_SPAG_S = '8e3c0544-b36e-4e04-91da-2eed13bb0f1d';
const PAKET_HEBAT_CHEESE = '12d13276-56d6-4db4-b843-95edad1d5d80';
const PAMER_7 = '771ec83a-1f0b-4fd9-9ce2-71903176878b';
const PAMER_5 = '83c85842-2b5e-4026-be49-cb41b692a44f';
const PANAS_SPECIAL = '2e85de04-7655-458f-97f8-c1732875a0dd';
const PANAS_2_RICE = '3690d545-0154-432f-917e-80aceab6d527';
const PANAS_1 = '72c5d903-e822-4eb7-a745-dc85f67750e3';
const PANAS_2_FRIES = 'f1420233-a7b3-42d2-accb-d823235c4298';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const items = [
            // Happy Meal Beef Burger = Beef Burger + Fries + Coca Cola
            { paket_id: HAPPY_MEAL_BEEF, item_menu_id: BEEF_BURGER },
            { paket_id: HAPPY_MEAL_BEEF, item_menu_id: FRENCH_FRIES },
            { paket_id: HAPPY_MEAL_BEEF, item_menu_id: COCA_COLA },

            // Happy Meal 4 pcs = McNuggets + Fries + Coca Cola
            { paket_id: HAPPY_MEAL_4PCS, item_menu_id: MCNUGGETS },
            { paket_id: HAPPY_MEAL_4PCS, item_menu_id: FRENCH_FRIES },
            { paket_id: HAPPY_MEAL_4PCS, item_menu_id: COCA_COLA },

            // Happy Meal Ayam = Ayam Krispy + Fries + Coca Cola
            { paket_id: HAPPY_MEAL_AYAM, item_menu_id: AYAM_KRISPY },
            { paket_id: HAPPY_MEAL_AYAM, item_menu_id: FRENCH_FRIES },
            { paket_id: HAPPY_MEAL_AYAM, item_menu_id: COCA_COLA },

            // Paket Hebat McSpaghetti = McSpaghetti + Coca Cola
            { paket_id: PAKET_HEBAT_SPAG, item_menu_id: MCSPAGHETTI },
            { paket_id: PAKET_HEBAT_SPAG, item_menu_id: COCA_COLA },

            // Paket Hebat Chicken = Chicken Snack Wrap + Coca Cola
            { paket_id: PAKET_HEBAT_CHICK, item_menu_id: CHICKEN_SNACK_WRAP },
            { paket_id: PAKET_HEBAT_CHICK, item_menu_id: COCA_COLA },

            // Paket Hebat Korean Soy Garlic = Korean Soy + Coca Cola
            { paket_id: PAKET_HEBAT_KOREAN, item_menu_id: KOREAN_SOY },
            { paket_id: PAKET_HEBAT_KOREAN, item_menu_id: COCA_COLA },

            // Paket Hebat McSpaghetti Ayam Krispy = McSpaghetti + Ayam Krispy + Coca Cola
            { paket_id: PAKET_HEBAT_SPAG_K, item_menu_id: MCSPAGHETTI },
            { paket_id: PAKET_HEBAT_SPAG_K, item_menu_id: AYAM_KRISPY },
            { paket_id: PAKET_HEBAT_SPAG_K, item_menu_id: COCA_COLA },

            // Paket Hebat McSpaghetti Ayam Spicy = McSpaghetti + Ayam Spicy + Coca Cola
            { paket_id: PAKET_HEBAT_SPAG_S, item_menu_id: MCSPAGHETTI },
            { paket_id: PAKET_HEBAT_SPAG_S, item_menu_id: AYAM_SPICY },
            { paket_id: PAKET_HEBAT_SPAG_S, item_menu_id: COCA_COLA },

            // Paket Hebat Cheeseburger = Cheeseburger + Fries + Coca Cola
            { paket_id: PAKET_HEBAT_CHEESE, item_menu_id: CHEESEBURGER },
            { paket_id: PAKET_HEBAT_CHEESE, item_menu_id: FRENCH_FRIES },
            { paket_id: PAKET_HEBAT_CHEESE, item_menu_id: COCA_COLA },

            // PaMer 7 = Ayam Krispy + Ayam Spicy + McSpaghetti + Fries + Coca Cola + McFlurry + Apple Pie
            { paket_id: PAMER_7, item_menu_id: AYAM_KRISPY },
            { paket_id: PAMER_7, item_menu_id: AYAM_SPICY },
            { paket_id: PAMER_7, item_menu_id: MCSPAGHETTI },
            { paket_id: PAMER_7, item_menu_id: FRENCH_FRIES },
            { paket_id: PAMER_7, item_menu_id: COCA_COLA },
            { paket_id: PAMER_7, item_menu_id: MCFLURRY_OREO },
            { paket_id: PAMER_7, item_menu_id: APPLE_PIE },

            // PaMer 5 = Ayam Krispy + McSpaghetti + Fries + Coca Cola + Apple Pie
            { paket_id: PAMER_5, item_menu_id: AYAM_KRISPY },
            { paket_id: PAMER_5, item_menu_id: MCSPAGHETTI },
            { paket_id: PAMER_5, item_menu_id: FRENCH_FRIES },
            { paket_id: PAMER_5, item_menu_id: COCA_COLA },
            { paket_id: PAMER_5, item_menu_id: APPLE_PIE },

            // PaNas Special = Ayam Krispy + Ayam Spicy + Fries + Coca Cola
            { paket_id: PANAS_SPECIAL, item_menu_id: AYAM_KRISPY },
            { paket_id: PANAS_SPECIAL, item_menu_id: AYAM_SPICY },
            { paket_id: PANAS_SPECIAL, item_menu_id: FRENCH_FRIES },
            { paket_id: PANAS_SPECIAL, item_menu_id: COCA_COLA },

            // PaNas 2 with Rice = Ayam Krispy + Ayam Spicy + Mineral Water
            { paket_id: PANAS_2_RICE, item_menu_id: AYAM_KRISPY },
            { paket_id: PANAS_2_RICE, item_menu_id: AYAM_SPICY },
            { paket_id: PANAS_2_RICE, item_menu_id: MINERAL_WATER },

            // PaNas 1 = Ayam Krispy + Mineral Water
            { paket_id: PANAS_1, item_menu_id: AYAM_KRISPY },
            { paket_id: PANAS_1, item_menu_id: MINERAL_WATER },

            // PaNas 2 with Fries = Ayam Krispy + Ayam Spicy + Fries
            { paket_id: PANAS_2_FRIES, item_menu_id: AYAM_KRISPY },
            { paket_id: PANAS_2_FRIES, item_menu_id: AYAM_SPICY },
            { paket_id: PANAS_2_FRIES, item_menu_id: FRENCH_FRIES },
        ].map(item => ({
            ...item,
            pi_id: uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        await queryInterface.bulkInsert('PaketItem', items);
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('PaketItem', null, {});
    }
};