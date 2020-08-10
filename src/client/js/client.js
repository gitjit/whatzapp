const socket = io("http://localhost:8000");

//Get DOM Elements
const form = document.getElementById("send-container");
const messageInput = document.getElementById("msgInput");
const messageContainer = document.querySelector(".container");
const nameH = document.getElementById("name-h4");

// Prompt name of user and emit
const name = prompt("Enter your name to join");
if (name != null) {
  socket.emit("new-user-joined", name);
  nameH.innerText = name;
}

// User joined the chat
function append(message, position) {
  const msg = document.createElement("div");
  msg.innerText = message;
  msg.classList.add("message");
  msg.classList.add(position);
  messageContainer.append(msg);
}
socket.on("user-joined", (name) => {
  append(`${name} joined the room`, "right");
});

// Send a message
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You:${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});


// Received a message
socket.on("receive", (data) => {
  append(`${data.name} : ${data.message}`, "left");
});

// User left 
socket.on("left", name => {
  append(`${name} left`)
})

