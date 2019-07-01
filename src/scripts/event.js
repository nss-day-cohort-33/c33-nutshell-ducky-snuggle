//event listener for the registration submit button
import {API} from "./api/api_manager.js";
import {utilityFunc} from "./utility.js"

function submitRegBtn (){
document.querySelector("#submit-reg-btn").addEventListener("click", () => {
    console.log("you clicked the save")
    let userName = document.querySelector("#userName").value
    let email = document.querySelector("#email").value
    let userObj = utilityFunc.createUserObj(userName, email)
    console.log(userObj)
    API.saveToApi("user", userObj)

})
}

export {submitRegBtn}