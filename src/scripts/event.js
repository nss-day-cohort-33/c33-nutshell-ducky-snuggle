//event listener for the registration submit button//
import { API } from "./api/api_manager.js";
import { utilityFunc } from "./utility.js";
import { registerUserForm } from "./login_register.js";
import { RENDER } from "./render.js"
import { eventComponent } from "./eventComponent.js";

let targetContainer = document.querySelector("#container");

const EVENT = {
  // Refactored login function so event listeners allow click or keypress
    loginUserClick: function () {document.querySelector("#login-btn").addEventListener("click", () => this.loginUser())},
    loginUserKeyup: function () {document.querySelector("#password").addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
          this.loginUser()
        }
      }
    )},
    // Added to conditional statements to allow email address for login
    loginUser: function() {
      let userName = document.querySelector("#login").value;
      let passWord = document.querySelector("#password").value;
      API.searchUsersApi(userName).then(user => {
        if (user.length === 0 || userName === "") {
          alert("Username does not exist! Please Register.")
        } else if (user[0].password !== passWord) {
          alert("Incorrect Password")
        } else if (user[0].password === passWord && (user[0].user_name === userName || user[0].email === userName)) {
          sessionStorage.setItem("user_name", user[0].user_name)
          sessionStorage.setItem("id", user[0].id )
          let userID = sessionStorage.getItem("id")
          targetContainer.innerHTML = ""
          console.log("logged in")
          // API.getFromApi("event", userID).then(RENDER.insertComponent)
          // createEventForm()
          eventComponent.loadEventBox()
          }
        });
      },
    registerPageLink: function() {
      document.querySelector("#register-link").addEventListener("click", () => {
        event.preventDefault();
        targetContainer.innerHTML = registerUserForm();
        EVENT.submitRegClick();
        EVENT.submitRegKeyup();
      });
    },
    submitRegClick: function () {document.querySelector("#submit-reg-btn").addEventListener("click", () => this.submitReg())},
    submitRegKeyup: function () {document.querySelector("#password").addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
          this.submitReg()
        }
      }
    )},
    submitReg: function() {
      // document.querySelector("#submit-reg-btn").addEventListener("click", () => {
        console.log("you clicked the save");
        let userName = document.querySelector("#userName").value;
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;
        let userObj = utilityFunc.createUserObj(userName, email, password);

        API.searchUsersApi(userName).then(user => {
          if (user.length === 0){
            API.searchUsersApi(email).then(email => {
              if (email.length === 0) {
                console.log(userObj);
                API.saveToApi("user", userObj);
                  sessionStorage.setItem("user_name", userName)
                  sessionStorage.setItem("id", makeRegId())
                  let userID = sessionStorage.makeItem("id")
                  targetContainer.innerHTML = ""
                  console.log("logged in")
              // loadEventBox()
              } else if (email === user[0].email) {
                  alert(`There's an existing account registered under ${email}. Please try again.`)
              }
            })
          } else if (!userName || !email || !password) {
              alert("Please complete all fields.")
          } else if(userName === user[0].user_name && email === user[0].email) {
              alert("You are already registered. Please login.")
          } else if (user[0].email === email) {
              alert(`There's an existing account registered under ${email}. Please try again.`)
          } else if (userName === user[0].user_name) {
              alert(`${userName} is already taken. Please try again.`)
          }
        });
      // });
    }
  };

  // NEED TO FIND BETTER PLACE FOR THIS
  function makeRegId () {
    API.getFromApi("user").then(user => {
      return user.length + 1
    })
  }


  export { EVENT };
  // ****This is the super long way but pretty cool******
  // for (const value of Object.values(users)) {
  //   console.log("object", value.user_name);
  //   if(userName === value.user_name){
  //     sessionStorage.setItem("id", value.id )

  //   }
  //   alert("Username does not exist. Please register!")
  // }
