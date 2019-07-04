import { loginUser } from "./login_register.js";
import { EVENT } from "./event.js";

import {API} from "./api/api_manager.js"
import {RENDER} from "./render.js"

console.log(
  "Your Webpack application is set up and ready to go. Please start writing code."
);


let targetContainer = document.querySelector("#container");
// targetContainer.innerHTML = loginUser();

// EVENT.loginUserBtn();
// EVENT.registerPageLink();

let userID = sessionStorage.getItem("id")
console.log(userID)
// API.getFromApi("event", userID).then(RENDER.insertForm)
// API.getFromApi("event", userID).then(RENDER.insertComponent)

export {targetContainer}