require('dotenv').config()
const express = require('express');
const { init } = require('./models/init');
const port = 3000;
const app = express();
app.use(express.json());

const tasksApi = require('./routes/tasks');

app.use('/tasks', tasksApi);

app.listen(port, async () => {
    console.log(`Server started on ${port} port`);
    await init();
});
