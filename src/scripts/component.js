import { API } from "./api/api_manager.js";
import { utilityFunc } from "./utility.js";
import { EVENT } from "./event.js";

const userMESSAGE = {
  chatBoxComponent: function() {
    API.getAllFromApi("messages", "_expand=user").then(messages => {
      let chatBox = document.querySelector("#chat-box");
      messages.forEach(messageitem => {
        let userName =  sessionStorage.getItem("user_name")
        let chatMessage = document.createElement("div");
        let deleteMessageBtn = document.createElement("button");
        chatMessage.setAttribute("id", "chat-message");
        deleteMessageBtn.setAttribute("id", `${messageitem.id}`);
        deleteMessageBtn.textContent = "X";
        chatMessage.innerHTML += `<p><strong>${messageitem.user.user_name}:</strong> ${messageitem.message}</p>`;
        if (userName === messageitem.user.user_name) {
          chatMessage.appendChild(deleteMessageBtn);
          deleteMessageBtn.addEventListener("click", () => {
            let id = event.target.id;
            API.deleteFromApi("messages", id)
          })
        }
        chatBox.appendChild(chatMessage);
      });
    });
  },
  messageComponent: function() {
    let messageContainer = document.createElement("div");
    let messageInputLabel = document.createElement("label");
    let messageInput = document.createElement("input");
    let chatHeader = document.createElement("h1");
    let chatBox = document.createElement("div");
    chatHeader.innerHTML = "Chat";
    chatBox.setAttribute("id", "chat-box");
    messageContainer.setAttribute("id", "message-component");
    messageInputLabel.setAttribute("for", "message-input");
    messageInputLabel.textContent = "Message: ";
    messageInput.setAttribute("id", "message-input");
    messageInput.setAttribute("type", "text");
    messageInput.setAttribute("placeholder", "Type your message!");
    messageContainer.appendChild(chatHeader);
    messageContainer.appendChild(chatBox);
    messageContainer.appendChild(messageInputLabel);
    messageContainer.appendChild(messageInput);
    userMESSAGE.chatBoxComponent();
    return messageContainer;
  }
};

function postMessage() {
  let messageInput = document.querySelector("#message-input").value;
  let userID = sessionStorage.getItem("id");
  let messageObj = utilityFunc.createMessageObj(userID, messageInput);
  API.saveToApi("messages", messageObj);
}

export { userMESSAGE, postMessage };
