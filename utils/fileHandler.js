const fs = require('fs');
const path = require('path');


const DATA_FILE = path.join(__dirname, "../data/tasks.json");

const readTaskFromeFile = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8')
        return JSON.parse(data);
    }
    catch (error) {
        return [];
    }
};


const writerTasksFile = (tasks) => {
    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(tasks,null,2),
        'utf8'
    );
};

module.exports = {writerTasksFile, readTaskFromeFile}