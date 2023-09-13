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
tasksApi.post('/', createTask);
tasksApi.get('/:id', getTaskById);
tasksApi.patch('/:id', updateTask);
tasksApi.delete('/:id', deleteTask);

module.exports = tasksApi;