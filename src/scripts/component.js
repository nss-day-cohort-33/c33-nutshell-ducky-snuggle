import { API } from "./api/api_manager.js";

const userMESSAGE = {
  chatBoxComponent: function() {
    API.getAllFromApi("message").then(messages => {
      let chatBox = document.querySelector("#chat-box");
      messages.forEach(messageitem => {
        chatBox.innerHTML += `<div><strong>USERNAME: </strong></div><div>${
          messageitem.message
        }</div>`;
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
    // chatBox.innerHTML += userMESSAGE.chatBoxComponent();
    messageContainer.appendChild(chatHeader);
    messageContainer.appendChild(chatBox);
    messageContainer.appendChild(messageInputLabel);
    messageContainer.appendChild(messageInput);
    userMESSAGE.chatBoxComponent();
    return messageContainer;
  }
};

export { userMESSAGE };

// let userMessage = `
//         <div><strong>${userName}: </strong></div>
//         <div>${messageArray.message}</div>
//     `;
//     messageContainer.innerHTML = userMessage;
