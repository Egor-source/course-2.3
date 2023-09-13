const express = require('express');
const port = 3000;

const app = express();
app.use(express.json());

const tasksApi = require('./routes/tasks');

app.use('/tasks', tasksApi);

app.listen(port, () => {
    console.log(`Server started on ${port} port`);
});
