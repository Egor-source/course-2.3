const express = require('express');
const tasksApi = express.Router();

const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} = require('../controllers/tasksController');

tasksApi.get('/', getAllTasks);
tasksApi.get('/:id', getTaskById);
tasksApi.post('/:id', createTask);
tasksApi.patch('/:id', updateTask);
tasksApi.delete('/:id', deleteTask);

module.exports = tasksApi;