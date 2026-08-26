const express = require('express')
const taskRoutes = require("./routes/tasks")

const { uploader } = require("./utils/files.util");

const TasksRouter = express.Router();

const app = express();
const PORT = 3000;

app.use(express.json())
app.use("/api/tasks", taskRoutes)

app.use("/files",express.static("uploads"))


TasksRouter.post("/profile", uploader.single("photo"), (req, res) => {
  const file = req.file;

  console.log(file);

  res.send(`files/${file.filename}`);
});


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}/api/tasks`)
})
