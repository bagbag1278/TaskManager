require('dotenv').config();   

const express = require("express");
const authRoutes = require('./src/routes/authRoutes')
const catgoryRoutes = require('./src/routes/catgoryRoutes')
const productRoutes = require('./src/routes/productRoutes')
const favoritesRouter = require('./src/routes/favoriteRoutes')
const imageRouters = require('./src/routes/imageRoutes')

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/files", express.static("uploads"));

app.use("/auth" , authRoutes)
app.use("/api/categories", catgoryRoutes);     
app.use("/api/products", productRoutes);
app.use("/api/favorites", favoritesRouter);
app.use("/api/images", imageRouters);

app.use((req, res) => {
    res.status(404).json({ error: 'مسیر پیدا نشد' });
});

app.listen(PORT, () => {
    console.log(`ران شد`);
});