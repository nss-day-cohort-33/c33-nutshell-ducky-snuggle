import {API} from "./api/api_manager.js"
import {targetContainer} from "./main.js"
import {eventComponent} from "./eventComponent.js"
import {friendComponent} from "./friendComponent.js"

const RENDER = {
  insertComponent: function(infoArray) {
      for (let i = 0; i < infoArray.length; i++) {
          targetContainer.appendChild(eventComponent.createEventComponent(infoArray[i]));
        }
    },
    insertFriendComponent: function(infoArray) {
        for (let i = 0; i < infoArray.length; i++) {
            targetContainer.appendChild(friendComponent.createFriendList(infoArray[i]));
          }
    },
    insertForm: function () {
        targetContainer.appendChild(eventComponent.createEventForm())
    },
    getAndDisplay: function (eventObj) {
        // targetContainer.innerHTML = ""
        document.querySelector("#event-list-container").innerHTML = ""
        document.querySelector("#past-event-div").innerHTML = ""
        API.getDatesFromApi("events", eventObj.user_id)
        .then(this.insertComponent)
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