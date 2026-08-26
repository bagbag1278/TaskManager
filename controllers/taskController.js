const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/tasks.json');

const readTasksFromFile = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeTasksToFile = (tasks) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf8');
};

let tasks = readTasksFromFile();
let nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

 const getAllTasks = (req, res) => {
    let result = tasks;

    if (req.query.completed !== undefined) {
        const completed = req.query.completed === 'true';
        result = result.filter(t => t.completed === completed);
    }

    if (req.query.search) {
        const searchTerm = req.query.search.toLowerCase();
        result = result.filter(t =>
            t.title.toLowerCase().includes(searchTerm)
        );
    }

    res.json(result);
};

//  GET BY ID
const getTaskById = (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ error: 'تسک پیدا نشد' });
    }

    const response = {
        ...task,
        imageUrl: task.image ? `http://localhost:3000/files/${task.image}` : null
    };

    res.json(response);
};

// CREATE 
const createTask = (req, res) => {
    const { title, image } = req.body;

    if (!title) {
        return res.status(400).json({ error: "عنوان را وارد کنید" });
    }

    const newTask = {
        id: nextId++,
        title: title,
        completed: false,
        createdAt: new Date().toISOString(),
        image: image || null
    };

    tasks.push(newTask);
    writeTasksToFile(tasks);

    res.status(201).json(newTask);
};

// UPDATE 
const updateTask = (req, res) => {
    const id = Number(req.params.id);
    const { title, completed, image } = req.body;
    const task = tasks.find(el => el.id === id);

    if (!task) {
        return res.status(404).json({ error: "تسک پیدا نشد" });
    }

    if (!title) {
        return res.status(400).json({ error: 'عنوان الزامی است' });
    }

    task.title = title;
    task.completed = completed !== undefined ? completed : task.completed;
    if (image !== undefined) task.image = image;

    writeTasksToFile(tasks);

    res.json({
        success: true,
        message: "تسک با موفقیت بروزرسانی شد",
        data: task
    });
};

// PATCHٍE
const patchTask = (req, res) => {
    const id = Number(req.params.id);
    const { title, completed, image } = req.body;
    const task = tasks.find(el => el.id === id);

    if (!task) {
        return res.status(404).json({ error: "تسک پیدا نشد" });
    }

    if (title !== undefined) {
        if (title.trim() === '') {
            return res.status(400).json({ error: 'عنوان نمی‌تواند خالی باشد' });
        }
        task.title = title;
    }

    if (completed !== undefined) {
        task.completed = completed;
    }

    if (image !== undefined) {
        task.image = image;
    }

    writeTasksToFile(tasks);

    res.json({
        success: true,
        message: "تسک با موفقیت بروزرسانی شد",
        data: task
    });
};

// DELETE
const deleteTask = (req, res) => {
    const id = Number(req.params.id);
    const index = tasks.findIndex(el => el.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "تسک پیدا نشد" });
    }

    const deletedTask = tasks[index];
    tasks.splice(index, 1);
    writeTasksToFile(tasks);

    res.status(200).json({
        success: true,
        message: `تسک "${deletedTask.title}" با موفقیت حذف شد`,
        deletedTask: deletedTask
    });
};

// TOGGLE 
const toggleTask = (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(el => el.id === id);

    if (!task) {
        return res.status(404).json({ error: "تسک پیدا نشد" });
    }

    task.completed = !task.completed;
    writeTasksToFile(tasks);

    res.json({
        success: true,
        message: `وضعیت تسک به "${task.completed ? 'انجام شده' : 'انجام نشده'}" تغییر کرد`,
        data: task
    });
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    patchTask,
    deleteTask,
    toggleTask
};