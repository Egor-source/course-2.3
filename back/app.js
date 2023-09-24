require('dotenv')
    .config();
const express = require('express');
const { createServer } = require('http');
const { init } = require('./models/init');
const initWs = require('./ws/init');
const port = 3000;
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const tasksApi = require('./routes/tasks');
const authApi = require('./routes/auth');
const usersApi = require('./routes/users');

app.use('/tasks', tasksApi);
app.use('/auth', authApi);
app.use('/users', usersApi);

const httpServer = createServer(app);

initWs(httpServer);

httpServer.listen(port, async () => {
    console.log(`Server started on ${port} port`);
    await init();
});
