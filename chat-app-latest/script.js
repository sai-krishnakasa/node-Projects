const socket = io("http://localhost:3000");
const msgForm = document.getElementById("send-container");
const msgContainer = document.getElementById("message-container");
const input = document.getElementById("input");
const nam = prompt("What is your name");
socket.emit("new-user", nam);

appendElement("you joined");
socket.on("chat-message", (data) => {
  console.log(data);
  appendElement(`${data.name} : ${data.msg}`);
  //   socket.emit("chat");
});

socket.on("user-connected", (name) => {
  appendElement(`${name} Connected!..`);
  //   socket.emit("chat");
});

socket.on("user-disconnected", (name) => {
  appendElement(`${name} DisConnected!..`);
  //   socket.emit("chat");
});

msgForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = input.value;
  console.log(msg);
  appendElement(` you : ${msg}`);
  socket.emit("send-chat-message", msg);
  input.value = "";
});

function appendElement(msg) {
  const msgElement = document.createElement("div");
  msgElement.innerText = msg;
  msgContainer.append(msgElement);
}
