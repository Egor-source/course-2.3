require('dotenv')
    .config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { init } = require('./models/init');
const port = 3000;
const app = express();
app.use(express.json());

const tasksApi = require('./routes/tasks');

app.use('/tasks', tasksApi);

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log('Client connected', socket.id);
});

httpServer.listen(port, async () => {
    console.log(`Server started on ${port} port`);
    await init();
});
