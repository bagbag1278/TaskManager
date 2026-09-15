const express = require("express");
const taskRoutes = require("./routes/tasks");
const authRoutes = require('./src/routes/authRoutes')
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/files", express.static("uploads"));

app.use("/", taskRoutes);
app.use("/" , authRoutes)

app.use((req, res) => {
    res.status(404).json({ error: 'مسیر پیدا نشد' });
});

app.listen(PORT, () => {
    console.log(`ران شد`);
});