const express = require('express')
const http = require('http')
const path = require('path')
const app = express()
const server = http.createServer(app)
const { Server } = require("socket.io");

const io = new Server(server);



app.use(express.static(path.join(__dirname, 'public')))


io.on('connection', (socket) => {
    console.log('a user connected socket id', socket.id);
    socket.emit("welcomemessage", "Welcome to the chat")
});

const PORT = 3000 || process.env.PORT

server.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`)
})


// app.get()