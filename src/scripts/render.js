import {createEventForm, createEventComponent} from "./eventComponent.js"
import {targetContainer} from "./main.js"
import {API} from "./api/api_manager.js"

const RENDER = {
  insertComponent: function(infoArray) {
      for (let i = 0; i < infoArray.length; i++) {
          targetContainer.appendChild(createEventComponent(infoArray[i]));
        }
    },
    insertForm: function () {
        targetContainer.appendChild(createEventForm())
    },
    getAndDisplay: function (eventObj) {
        // targetContainer.innerHTML = ""
        document.querySelector("#event-list-container").innerHTML = ""
        document.querySelector("#past-event-div").innerHTML = ""
        API.getDatesFromApi("event", eventObj.user_id)
        .then(this.insertComponent)
    }
};

export {RENDER}