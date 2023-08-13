const socketio = require("socket.io");
const io = socketio(3000, {
  cors: {
    origin: "*",
  },
});
const users = {};

io.on("connection", (socket) => {
  console.log("New conn");
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
  //   socket.emit("chat-message", "He);Akash
  socket.on("send-chat-message", (msg) => {
    socket.broadcast.emit("chat-message", { msg, name: users[socket.id] });
    console.log(msg);
  });
  socket.on("disconnect", (name) => {
    socket.broadcast.emit("user-disconnected", users[socket.is]);
    delete users[socket.id];
  });
});

// const app = express();
// app.use(
//   cors({
//     origin: "*", // Allow requests from any origin
//   })
// );

// const server = app.listen(3000, () => {
//   console.log("server LIstening......");
// });
// const io = socketio(server);

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });
