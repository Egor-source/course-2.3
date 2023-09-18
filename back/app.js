require('dotenv')
    .config();
const express = require('express');
const { createServer } = require('http');
const { init } = require('./models/init');
const initWs = require('./ws/init');
const port = 3000;
const app = express();
app.use(express.json());

const tasksApi = require('./routes/tasks');

app.use('/tasks', tasksApi);

const httpServer = createServer(app);

initWs(httpServer);

httpServer.listen(port, async () => {
    console.log(`Server started on ${port} port`);
    await init();
});
