function getAllTasks (req, res) {
    try {
        res.send('tasks');
    } catch (e) {
        res.status(400)
            .json(e);
    }
}

function getTaskById (req, res) {
    try {
        res.send(`task ${req.params.id}`);
    } catch (e) {
        res.status(400)
            .json(e);
    }
}

function createTask (req, res) {
    try {
        res.status(201).send(`task ${req.params.id} created`);
    } catch (e) {
        res.status(400)
            .json(e);
    }
}

function updateTask (req, res) {
    try {
        res.send(`task ${req.params.id} updated`);
    } catch (e) {
        res.status(400)
            .json(e);
    }
}

function deleteTask (req, res) {
    try {
        res.send(`task ${req.params.id} deleted`);
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