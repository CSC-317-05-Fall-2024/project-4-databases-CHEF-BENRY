import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRestaurants } from './data/restaurants.js';
import { backendRouter } from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/attractions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'attractions.html'));
});

app.get('/restaurants', async (req, res) => {
    const restaurantData = await getRestaurants();
    res.render('restaurants', { restaurants: restaurantData });
});

app.get("/newPage",(req, resp) => {
    resp.sendFile(path.join(__dirname, "public", 'newPage.html'));
})

app.use(backendRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
