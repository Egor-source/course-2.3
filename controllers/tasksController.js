const { Task } = require('../models/init');

async function getAllTasks (req, res) {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (e) {
        res.status(400)
            .json(e);
    }
}

async function getTaskById (req, res) {
    try {
        const task = await Task.findByPk(req.params.id);
        res.json(task);
    } catch (e) {
        res.status(400)
            .json(e);
    }
}

async function createTask (req, res) {
    try {
        const { text } = req.body;
        const newTask = await Task.create({ text });
        res.status(201)
            .json(newTask);
    } catch (e) {
        res.status(400)
            .json(e);
    }
}

async function updateTask (req, res) {
    try {
        const {
            text,
            isCompleted,
        } = req.body;
        const task = await Task.findByPk(req.params.id);
        task.text = text ?? task.text;
        task.isCompleted = !!isCompleted;
        await task.save();
        res.status(200)
            .json({
                status: 'OK',
            });
    } catch (e) {
        res.status(400)
            .json(e);
    }
}

async function deleteTask (req, res) {
    try {
        const task = await Task.findByPk(req.params.id);
        await task.destroy();
        res.status(200)
            .json({
                status: 'OK',
            });
    } catch (e) {
        res.status(400)
            .json(e);
    }
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};