import express from 'express';
import { createRestaurant, deleteRestaurant } from '../data/restaurants.js';

const router = express.Router();

router.post('/api/restaurants', (req, res) => {
    const restaurantData = req.body;
    console.log(restaurantData)
    try {
        const newRes = createRestaurant(restaurantData);
        res.status(200).json(newRes)
    } catch (error) {
        console.log(error)
        res.status(500).json({"message": `${error}`})
    }
});

router.delete('/api/restaurants/:id', (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const restaurant = deleteRestaurant(id);
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ "message": `${error}` });
    }
});

export { router as backendRouter };
