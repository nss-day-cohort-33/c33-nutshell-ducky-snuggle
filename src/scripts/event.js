//event listener for the registration submit button//
import { API } from "./api/api_manager.js";
import { utilityFunc } from "./utility.js";
import { registerUserForm } from "./login_register.js";
import {newsFunc} from "./component.js";
import {RENDER} from  "./render.js"

let targetContainer = document.querySelector("#container");

const EVENT = {
  loginUserBtn: function() {
    document.querySelector("#login-btn").addEventListener("click", () => {
      let userName = document.querySelector("#login").value;
      let passWord = document.querySelector("#password").value;
      API.loginFromApi(userName).then(user => {
        if(user.length === 0) {
          alert("Username does not exist! Please Register.")
        }else if (user[0].password !== passWord) {
          alert("Incorrect Password")
        } else if (user[0].user_name === userName && user[0].password === passWord) {
          sessionStorage.setItem("user_name", user[0].user_name)
          sessionStorage.setItem("id", user[0].id )
          let userID = sessionStorage.getItem("id")
          API.getFromApi("news", userID )
          .then( info => {
              console.log(info)
              targetContainer.innerHTML = ""
              targetContainer.appendChild(newsFunc.newsArtComponent())
              info.forEach(element => {
                  targetContainer.innerHTML += newsFunc.newsFromApi(element)
              });
          // targetContainer.innerHTML = ""
          // API.getFromApi("message", userID)
          })
          }
        })
      });
    },
    registerPageLink: function() {
      document.querySelector("#register-link").addEventListener("click", () => {
        event.preventDefault();
        targetContainer.innerHTML = registerUserForm();
        EVENT.submitRegBtn();
      });
    },
    submitRegBtn: function() {
      document.querySelector("#submit-reg-btn").addEventListener("click", () => {
        console.log("you clicked the save");
        let userName = document.querySelector("#userName").value;
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;
        let userObj = utilityFunc.createUserObj(userName, email, password);
        console.log(userObj);
        API.saveToApi("user", userObj);

        // targetContainer.innerHTML = ""; --Will clear container upon submit--
      });
    }
  };

  export { EVENT };
  // ****This is the super long way but pretty cool******
  // for (const value of Object.values(users)) {
  //   console.log("object", value.user_name);
  //   if(userName === value.user_name){
  //     sessionStorage.setItem("id", value.id )

  //   }
  //   alert("Username does not exist. Please register!")
  // }
