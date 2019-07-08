import { loginUserForm } from "./login_register.js";
import { EVENT } from "./event.js";

import {API} from "./api/api_manager.js"
import {RENDER} from "./render.js"
import { eventComponent } from "./eventComponent.js";
import { friendComponent } from "./friendComponent.js";

console.log(
  "Your Webpack application is set up and ready to go. Please start writing code."
);


let targetContainer = document.querySelector("#container");
targetContainer.innerHTML = loginUserForm();

// Calls click/keypress event listeners for login
EVENT.loginUserClick();
EVENT.loginUserKeyup();
EVENT.registerPageLink();

let userID = sessionStorage.getItem("id")
console.log(userID)



export {targetContainer}