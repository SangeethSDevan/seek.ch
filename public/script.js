const socket = io("https://seek-ch.onrender.com/");
const roomInput = document.getElementById("room");
const roomForm = document.getElementById("room-input");
const sendForm = document.getElementById("send-box");
const messageInput = document.getElementById("message");
const messagesList = document.getElementById("messages");
const typing = document.getElementById("typing-indicator");
const join = document.getElementById("join");
const exitBtn=document.getElementById("exit-btn")
let timeout;

let name = getName();
if (name.length > 20) {
  alert("Name must contain only 20 letters!");
  name = getName();
  if (name.length > 20) name = name.slice(0, 10);
}

function joinRoom() {
  const room = roomInput.value;
  if (!room) {
    return alert("Enter a room name first!");
  }
  if (room.length > 10) return alert("Room code must have only 10 letters!");
  socket.emit("join-room", { room, name });
  socket.on("join-sts", (data) => {
    join.textContent = data;
    setTimeout(() => {
      join.textContent = "";
    }, 4000);
  });
  roomInput.disabled=true;
}

function sendMessage() {
  const room = roomInput.value;
  let message = messageInput.value;

  if (!room) return alert("Enter a room name first!");
  if (!message) return alert("Message can't be empty!");

  const li = document.createElement("li");

  message = message.length > 150 ? message.slice(0, 150) : message;
  li.textContent = `${message} : You`;
  messagesList.appendChild(li);
  socket.emit("send-message", { room, name, message });
  messageInput.value = "";
}

function showTyping() {
  const room = roomInput.value;
  socket.emit("show-typing", { room, name });

  clearTimeout(timeout);
  timeout = setTimeout(stopTyping, 3000);
}
function stopTyping() {
  const room = roomInput.value;
  socket.emit("remove-typing", room);
}

function getName() {
  let name = prompt("Enter your name!");
  while (!name) {
    alert("Name can't be empty!");
    name = prompt("Enter your name!");
  }
  return name;
}
socket.on("joined", (data) => {
  join.textContent = data;

  setTimeout(() => {
    join.textContent = "";
  }, 4000);
});

socket.on("recieve-message", (data) => {
  const li = document.createElement("li");

  li.innerHTML = `<span>${data.name}</span> : ${data.message}`;
  li.classList="sent"
  messagesList.appendChild(li);
});

socket.on("typing", (data) => {
  typing.textContent = `${data.name} is typing...`;
});

socket.on("not-typing", () => {
  typing.textContent = "";
});

socket.on("left-room",(data)=>{
  join.textContent=data
  setTimeout(()=>{
    join.textContent=""
  },4000)
})
socket.on("exited",()=>{
  join.textContent=`You exited from the room!`
  setTimeout(()=>{
    join.textContent=""
  },4000)
  roomInput.textContent=""
  roomInput.disabled=false
})
messageInput.addEventListener("input", showTyping);
roomForm.addEventListener("submit", (e) => {
  e.preventDefault();
  joinRoom();
});
sendForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  sendMessage()
})
exitBtn.addEventListener("click",()=>{
  socket.emit("exit-room")
})