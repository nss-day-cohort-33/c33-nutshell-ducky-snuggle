

import { loginUserForm } from "./login_register.js";
import { EVENT } from "./event.js";
import {RENDER} from "./render.js"
// import {API} from "./api/api_manager.js"
// import { eventComponent } from "./eventComponent.js";
// import { friendComponent } from "./friendComponent.js";

// SN- This is how I'm rendering it. I will probably need to move this


let targetContainer = document.querySelector("#container");

// Calls click/keypress event listeners for login
if (sessionStorage.getItem("user_name")) {
  targetContainer.innerHTML = ""
  RENDER.renderAllComponents()
} else {
  targetContainer.innerHTML = loginUserForm();
  EVENT.loginUserClick();
  EVENT.loginUserKeyup();
  EVENT.registerPageLink();
}

// let userID = sessionStorage.getItem("id")
// console.log(userID)


export {targetContainer}
