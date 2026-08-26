
let tasks = [];
let nextId = 1;


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

// get ALL
const getAllTasks = (req, res) => {
    res.send(tasks);
}
//get by ID
const getTaskById = (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ error: 'تسک پیدا نشد' });
    }

    res.json(task);
};

//create Task

const createTask = (req, res) => {

    const { title, image } = req.body;

    if (!title) {
        return res.status(404).json({ error: "عنوان را وارد کنید" });
    }
    const newTask = {
        id: nextId++,
        title: title,
        completed: false,
        createdAt: new Date().toISOString(),
        image: image || null
    }
    tasks.push(newTask);
    res.status(201).json(newTask);

}

// and delete them

const deleteTask = (req, res) => {
    const id = Number(req.params.id);
    const index = tasks.findIndex(el => el.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "تسک پیدا نشد جیگر" });
    }

    const deletedTask = tasks[index];
    tasks.splice(index, 1);

    res.status(200).json({
        success: true,
        message: `تسک "${deletedTask.title}" با موفقیت حذف شد`,
        deletedTask: deletedTask
    });
};

// updated

const updateTask = (req, res) => {
    const id = Number(req.params.id);

    const { title, completed } = req.body;

    const task = tasks.find(el => el.id === id);

    if (!task) {
        return res.status(404).json({ error: "تسک پیدا نشد" });
    }
    if (!title) {
        return res.status(400).json({ error: 'عنوان الزامی است' });
    }
    task.title = title;
    task.completed = completed !== undefined ? completed : task.completed;

    res.json({
        success: true,
        message: "تسک با موفقیت بروزرسانی شد",
        data: task
    });
};

//patch

const patchTask = (req, res) => {
    const id = Number(req.params.id);
    const { title, completed } = req.body;
    const task = tasks.find(el => el.id === id);

    if (!task) {
        return res.status(404).json({ error: "تسک پیدا نشد" });
    }

    if (title !== undefined) {
        if (title.trim() === '') {
            return res.status(400).json({ error: 'عنوان نمی‌تواند خالی باشد' });
        }
        task.title = title;  // ← task.title
    }

    if (completed !== undefined) {
        task.completed = completed;
    }

    res.json({
        success: true,
        message: "تسک با موفقیت بروزرسانی شد",
        data: task
    });
};



module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    deleteTask,
    updateTask,
    patchTask,
    toggleTask
};
