import { utilityFunc } from "../utility.js";
import { API } from "./api_manager.js";

function postMessage() {
    let messageInput = document.querySelector("#message-input").value;
    let userID = sessionStorage.getItem("id");
    let messageObj = utilityFunc.createMessageObj(userID, messageInput);
    API.saveToApi("messages", messageObj);
  }

  export { postMessage }