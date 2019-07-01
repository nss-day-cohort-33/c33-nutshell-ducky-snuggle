import {registerUserForm, loginUser} from "./login_register.js";
import {submitRegBtn, registerPageLink, loginUserBtn} from "./event.js"

console.log("Your Webpack application is set up and ready to go. Please start writing code.")

let targetContainer = document.querySelector("#container")
targetContainer.innerHTML += loginUser()


loginUserBtn()
registerPageLink()

