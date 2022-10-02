const wsUri = "wss://echo-ws-service.herokuapp.com";

function pageLoaded() {
  const infoOutput = document.querySelector(".info_output");
  const chatOutput = document.querySelector(".chat_output");
  const input = document.querySelector("input");
  const sendBtn = document.querySelector(".btn_send");
  
  let socket = new WebSocket(wsUri);
  
  socket.onopen = () => {
    infoOutput.innerText = "Отправишь мне сообщение, пожалуйста :3";
  }
  
  socket.onmessage = (event) => {
    writeToChat(event.data, true);
  }
  
  socket.onerror = () => {
    infoOutput.innerText = "При передаче данных произошла ошибка";
  }
  
  sendBtn.addEventListener("click", sendMessage);
  
    let i = 0;
  
  function sendMessage() {
    if (!input.value) return;
    if (ms[i] === undefined) {
        socket.send("*спит*");
    } else {
        socket.send(ms[i]);
    }
    i++;
    writeToChat(input.value, false);
    input.value === "";
  }
  
  function writeToChat(message, isRecieved) {
    let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`;
    chatOutput.innerHTML += messageHTML;
  }
}

document.addEventListener("DOMContentLoaded", pageLoaded);

const ms = ["Привет, солнышко",
"Ты самое очаровательное создание!",
"Надеюсь, у тебя сегодня будет прекрасный день", 
"Надя тебя очень любит и скучает",
"К сожалению, она больше не придумала сообщений и чатик устаф..."]