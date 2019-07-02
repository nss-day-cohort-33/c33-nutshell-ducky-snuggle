import {loginUser} from "./login_register.js";
import {EVENT} from "./event.js"

console.log("Your Webpack application is set up and ready to go. Please start writing code.")

let targetContainer = document.querySelector("#container")
targetContainer.innerHTML = loginUser()


EVENT.loginUserBtn()
EVENT.registerPageLink()

