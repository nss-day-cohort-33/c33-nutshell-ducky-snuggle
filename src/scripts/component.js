import { API } from "./api/api_manager.js";
import { EVENT } from "./event.js";

const userMESSAGE = {
  chatBoxComponent: function() {
    API.getAllFromApi("messages", "_expand=user").then(messages => {
      let chatBox = document.querySelector("#chat-box");
      let lastMessages = messages.slice(0).slice(-10)
      lastMessages.forEach(messageItem => {
        let userName =  sessionStorage.getItem("user_name")
        let chatMessage = document.createElement("div");
        let deleteMessageBtn = document.createElement("button");
        let editMessageBtn = document.createElement("button")
        let formatMessgaeBtn = document.createElement("button")
        let buttonContainer = document.createElement("div")
        chatMessage.setAttribute("id", `chat-message-${messageItem.id}`);
        chatMessage.setAttribute("class", "chat-message")
        deleteMessageBtn.setAttribute("id", `${messageItem.id}`);
        editMessageBtn.setAttribute("id", `${messageItem.id}`)
        formatMessgaeBtn.setAttribute("id", `${messageItem.id}`)
        formatMessgaeBtn.setAttribute("class", "format-btn-message")
        deleteMessageBtn.textContent = "X";
        editMessageBtn.textContent = "Edit"
        formatMessgaeBtn.textContent= "..."
        chatMessage.innerHTML += `<div class="message"><strong>${messageItem.user.user_name}: </strong> ${messageItem.message}</div>`;
        if (userName === messageItem.user.user_name) {
          deleteMessageBtn.setAttribute("style", "display: none")
          editMessageBtn.setAttribute("style", "display: none")
          chatMessage.appendChild(formatMessgaeBtn)
          EVENT.addRemoveFormatBtns(formatMessgaeBtn, deleteMessageBtn, editMessageBtn)
          chatMessage.appendChild(buttonContainer)
          buttonContainer.appendChild(deleteMessageBtn);
          buttonContainer.appendChild(editMessageBtn);
          EVENT.deleteMessage(deleteMessageBtn, chatBox)
          EVENT.editMessage(editMessageBtn, chatMessage, messageItem)
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
    // EVENT.submitMessage()  -Currently wont function when placed directly in Component-
    return messageContainer;
  },
  editMessageComponent: function(usermessage) {
    let chatBox = document.querySelector("#chat-box");
    let editMessageDiv = document.createElement("div");
    let saveEditMessageButton = document.createElement("button")
    let editMessageForm = `
    <label for="edit-message-input">EDIT: </label>
    <textarea id="edit-message-input">${usermessage.message}</textarea>
    `
    saveEditMessageButton.textContent = "Save"
    editMessageDiv.setAttribute("class", "edit-message-container")
    editMessageDiv.innerHTML = editMessageForm;
    saveEditMessageButton.setAttribute("id", `${usermessage.id}`)
    editMessageDiv.appendChild(saveEditMessageButton)
    EVENT.editMessageSave(saveEditMessageButton, chatBox)
    return editMessageDiv;
  }
};

// function postMessage() {
//   let messageInput = document.querySelector("#message-input").value;
//   let userID = sessionStorage.getItem("id");
//   let messageObj = utilityFunc.createMessageObj(userID, messageInput);
//   API.saveToApi("messages", messageObj);
// }

export { userMESSAGE };