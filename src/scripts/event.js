//event listener for the registration submit button
import { API } from "./api/api_manager.js";
import { utilityFunc } from "./utility.js";
import { registerUserForm } from "./login_register.js";

let targetContainer = document.querySelector("#container");

function submitRegBtn() {
  document.querySelector("#submit-reg-btn").addEventListener("click", () => {
    console.log("you clicked the save");
    let userName = document.querySelector("#userName").value;
    let email = document.querySelector("#email").value;
    let userObj = utilityFunc.createUserObj(userName, email);
    console.log(userObj);
    API.saveToApi("user", userObj);
    targetContainer = "";
  });
}

function registerPageLink() {
  document.querySelector("#register-link").addEventListener("click", () => {
    event.preventDefault();
    targetContainer.innerHTML = registerUserForm();
    submitRegBtn();
  });
}

function loginUserBtn() {
  document.querySelector("#login-btn").addEventListener("click", () => {
    let userName = document.querySelector("#login").value;
    console.log(userName);
  });
}

export { submitRegBtn, registerPageLink, loginUserBtn };
