
import { utilityFunc } from "../utility.js";
import { API } from "./api_manager.js";

//SN- This is your call to get a specific task from API

const objectManager = { //SN- task object Manager
    getTaskFromApi: function (database, Id) {
        return fetch(`http://localhost:3000/${database}?id=${Id}`)
        .then(data => data.json())
    },
}


function postMessage() {
    let messageInput = document.querySelector("#message-input").value;
    let userID = sessionStorage.getItem("id");
    let messageObj = utilityFunc.createMessageObj(userID, messageInput);
    API.saveToApi("messages", messageObj)
}

export { objectManager }
export { postMessage }
