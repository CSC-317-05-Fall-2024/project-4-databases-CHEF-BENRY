/* Initialize the data in the DB */
import { pool } from './database.js';

const dropTables = async () => {
    try {
        const dropReviewsTable = `
            DROP TABLE IF EXISTS reviews;
        `;
        await pool.query(dropReviewsTable);

        const dropTablesQuery = `
            DROP TABLE IF EXISTS restaurants;
        `;
        await pool.query(dropTablesQuery);
    } catch (error) {
        console.log(error)
    }
}

const createTables = async () => {
    try {
        const createTablesQuery = `
            CREATE TABLE IF NOT EXISTS restaurants (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                phone VARCHAR(20),
                address VARCHAR(255),
                photo VARCHAR(255)
            );
        `;
        await pool.query(createTablesQuery);
        const createReviewsTable = `
                CREATE TABLE IF NOT EXISTS reviews (
                    id SERIAL PRIMARY KEY,
                    rating INT CHECK (rating >= 1 AND rating <= 5),
                    content TEXT,
                    restaurant_id INT REFERENCES restaurants(id) ON DELETE CASCADE
                );
            `;
        await pool.query(createReviewsTable);
    } catch (error) {
        console.log(error)
    }
}

const insertData = async () => {
    try {
        const insertDataQuery = `
            INSERT INTO restaurants (id, name, phone, address, photo) VALUES
            (1, 'House of Prime Rib', '(415) 885-4605', '1906 Van Ness Ave, San Francisco, CA 94109', '/images/d7.jpg'),
            (2, 'Saison', '(415) 828-7990', '178 Townsend St, San Francisco, CA 94107', '/images/saison.jpg'),
            (3, 'Foreign Cinema', '(415) 648-7600', '2534 Mission St, San Francisco, CA 94110', '/images/foreigncinema.jpg'),
            (4, 'Nopa', '(415) 864-8643', '560 Divisadero St, San Francisco, CA 94117', '/images/nopa.jpg'),
            (5, 'R&G Lounge', '(415) 982-7877', '631 Grant Ave, San Francisco, CA 94108', '/images/rng.jpg'),
            (6, 'Dim Sum Club', '(415) 592-8938', '2237 Taraval St, San Francisco, CA 94116', '/images/dimsumclub.jpg'),
            (7, 'U:Dessert Story', '(415) 796-3633', '3489 16th St, San Francisco, CA 94114', '/images/udessert.jpg'),
            (8, 'House of Nanking', '(415) 421-1429', '919 Kearny St, San Francisco, CA 94133', '/images/honk.jpeg');
        `;
        await pool.query(insertDataQuery);

        const reviewsData = [
            { rating: 5, content: "Good Food", restaurant_id: 1 }, 
            { rating: 4, content: "Great Service", restaurant_id: 2 },
        ];

        for (const review of reviewsData) {
            const insertReview = `
                INSERT INTO reviews (rating, content, restaurant_id)
                VALUES ($1, $2, $3);
            `;
            await pool.query(insertReview, [review.rating, review.content, review.restaurant_id]);
        }
    
    } catch (error) {
        console.log(error)
    }
}

const setup = async () => {
    await dropTables();
    await createTables();
    await insertData();
}

setup();
