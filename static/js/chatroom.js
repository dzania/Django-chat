"use strict";
document.querySelector("#room-name-input").focus();
document.querySelector("#room-name-input").onkeyup = function (e) {
  if (e.keyCode === 13) {
    // enter, return
    document.querySelector("#room-name-submit").click();
  }
};

document.querySelector("#room-name-submit").onclick = function (e) {
  let roomName = document.querySelector("#room-name-input").value;
  let regex = /^[a-z0-9]+$/i;
  //check if input is alphanumeric
  if (!roomName.match(regex)) {
    alert("Wrong room name! No spaces!");
  } else {
    window.location.pathname = "/chat/" + roomName + "/";
  }
};
