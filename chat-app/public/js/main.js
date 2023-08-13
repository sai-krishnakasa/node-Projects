// Establish a connection
const socket = io();

// // Emit events or listen for events using the socket object
socket.on('connect', () => {
    console.log('Connected to server');
});

// // You can emit custom events from the client
socket.on("welcomemessage", (data) => {
    console.log(data)
})
// // You can listen for events from the server
socket.on('chatMessage', (message) => {
    console.log('Received message from server:', message);
});