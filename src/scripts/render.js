import {API} from "./api/api_manager.js"
import {targetContainer} from "./main.js"
import {eventComponent} from "./eventComponent.js"
import {friendComponent} from "./friendComponent.js"

const RENDER = {
    insertEventComponent: function(infoArray) {
      for (let i = 0; i < infoArray.length; i++) {
          targetContainer.appendChild(eventComponent.createEventComponent(infoArray[i]));
        }
    },
    insertFriendComponent: function(infoArray) {
        for (let i = 0; i < infoArray.length; i++) {
            targetContainer.appendChild(friendComponent.createFriendList(infoArray[i]));
          }
    },
    insertEventForm: function () {
        targetContainer.appendChild(eventComponent.createEventForm())
    },
    getAndDisplayEvents: function (eventObj) {
        // targetContainer.innerHTML = ""
        document.querySelector("#event-list-container").innerHTML = ""
        document.querySelector("#past-event-div").innerHTML = ""
        API.getDatesFromApi("events", eventObj.userId)
        .then(this.insertEventComponent)
    },
    getAndDisplayFriends: function () {
        // targetContainer.innerHTML = ""
        document.querySelector("#friend-list-container").innerHTML = ""
        // document.querySelector("#past-event-div").innerHTML = ""
        API.getFromApi("users")
        .then(this.insertFriendComponent)
    }
};

export {RENDER}