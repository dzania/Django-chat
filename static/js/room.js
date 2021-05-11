"use strict";

const roomName = JSON.parse(document.getElementById("room-name").textContent);
const cardHeader = (document.getElementById("room-header").innerHTML = roomName);

const chatSocket = new WebSocket("ws://" + window.location.host + "/ws/chat/" + roomName + "/");

chatSocket.onmessage = function (e) {
  let data = JSON.parse(e.data);
  document.querySelector("#chat-log").value += data.message + "\n";
 };

chatSocket.onclose = function (e) {
  console.error("Chat socket closed unexpectedly");
};

document.querySelector("#chat-message-input").focus();
document.querySelector("#chat-message-input").onkeyup = function (e) {
  if (e.keyCode === 13) {
    // enter, return
    document.querySelector("#chat-message-submit").click();
  }
};

document.querySelector("#chat-message-submit").onclick = function (e) {
  const messageInputDom = document.querySelector("#chat-message-input");
  let regex = /^\s*$/;
  const message = messageInputDom.value;
  if (!message.match(regex)) {
    chatSocket.send(
      JSON.stringify({
        message: message,
      })
    );
    messageInputDom.value = "";
  }
};


