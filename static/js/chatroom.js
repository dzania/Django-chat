'use strict';
document.querySelector("#room-name-input").focus();
document.querySelector("#room-name-input").onkeyup = function (e) {
  if (e.keyCode === 13) {
    // enter, return
    e.preventDefault();
    document.querySelector("#room-name-submit").click();
  }
};

document.querySelector("#room-name-submit").onclick = function (e) {
  e.preventDefault();
  var roomName = document.querySelector("#room-name-input").value;
  window.location.pathname = "/chat/" + roomName + "/";
};
