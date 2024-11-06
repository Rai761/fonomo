const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('ผู้ใช้เชื่อมต่อ: ' + socket.id);

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('ผู้ใช้หลุดจากการเชื่อมต่อ: ' + socket.id);
    });
});

server.listen(3000, () => {
    console.log('เซิร์ฟเวอร์กำลังทำงานที่ http://localhost:3000');
});
