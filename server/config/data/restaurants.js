// // Fill this in
// let restaurantData = [
//     { 
//         id: 1,
//         name: "House of Prime Rib",
//         phone: "(415) 885-4605",
//         address: "1906 Van Ness Ave, San Francisco, CA 94109",
//         photo: "/images/d7.jpg"
//     },
//     { 
//         id: 2,
//         name: "Saison",
//         phone: "(415) 828-7990",
//         address: "178 Townsend St, San Francisco, CA 94107",
//         photo: "/images/saison.jpg"
//     },
//     { 
//         id: 3,
//         name: "Foreign Cinema",
//         phone: "(415) 648-7600",
//         address: "2534 Mission St, San Francisco, CA 94110",
//         photo: "/images/foreigncinema.jpg"
//     },
//     { 
//         id: 4,
//         name: "Nopa",
//         phone: "(415) 864-8643",
//         address: "560 Divisadero St, San Francisco, CA 94117",
//         photo: "/images/nopa.jpg"
//     },
//     { 
//         id: 5,
//         name: "R&G Lounge",
//         phone: "(415) 982-7877",
//         address: "631 Grant Ave, San Francisco, CA 94108",
//         photo: "/images/rng.jpg"
//     },
//     { 
//         id: 6,
//         name: "Dim Sum Club",
//         phone: "(415) 592-8938",
//         address: "2237 Taraval St, San Francisco, CA 94116",
//         photo: "/images/dimsumclub.jpg"
//     },
//     { 
//         id: 7,
//         name: "U:Dessert Story",
//         phone: "(415) 796-3633",
//         address: "3489 16th St, San Francisco, CA 94114",
//         photo: "/images/udessert.jpg"
//     },
//     { 
//         id: 8,
//         name: "House of Nanking",
//         phone: "(415) 421-1429",
//         address: "919 Kearny St, San Francisco, CA 94133",
//         photo: "/images/honk.jpeg"
//     }
// ];

// let lastId = restaurantData.length;

// const getNextId = () => {
//     lastId += 1;
//     return lastId;
// };

import { pool } from '../database.js';

// Get a list of restaurants
const getRestaurants = async () => {
    const restaurant_list = await pool.query('SELECT * FROM restaurants');
    return restaurant_list.rows;
};


// Get a restaurant by id
const getRestaurant = async (id) => {
    const restaurant_by_id = await pool.query('SELECT * FROM restaurants WHERE id = $1', [id]);
    return restaurant_by_id;
};

// Create a new restaurant entry
const createRestaurant = async (data) => {
    const { name, address, phone, photo } = data;
    await pool.query(
        `INSERT INTO restaurants (name, address, phone, photo) VALUES ($1, $2, $3, $4) RETURNING *`,
        [name, address, phone, photo]
    );
};

// Delete a restaurant by id
const deleteRestaurant = async (id) => {
    await pool.query('DELETE FROM restaurants WHERE id = $1 RETURNING *', [id]);
};

const getReviewsForRestaurant = async (id) => {
    const getReview = await pool.query('SELECT * FROM reviews WHERE restaurant_id = $1', [id]);
    return getReview.rows;
};

export { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant, getReviewsForRestaurant};

