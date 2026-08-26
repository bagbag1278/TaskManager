const express = require("express");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/files", express.static("uploads"));

app.use("/api/tasks", taskRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'مسیر پیدا نشد' });
});

app.listen(PORT, () => {
    console.log(`ران شد`);
});