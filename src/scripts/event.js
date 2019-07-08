import { API } from "./api/api_manager.js";
import { utilityFunc } from "./utility.js";
import { registerUserForm } from "./login_register.js";
import { userMESSAGE } from "./component.js"
import { postMessage } from "./api/objet_manager.js"

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
          targetContainer.innerHTML = ""
          targetContainer.appendChild(userMESSAGE.messageComponent())
          EVENT.submitMessage()
          //--The Event Listener for Messages should not have to be in this EVENT --//
        }
      });
    });
  },
  registerPageLink: function() {
    document.querySelector("#register-link").addEventListener("click", () => {
      event.preventDefault();
      targetContainer.innerHTML = registerUserForm();
      EVENT.submitRegBtn();
    });
  },
  //event listener for the registration submit button//
    submitRegBtn: function() {
      document.querySelector("#submit-reg-btn").addEventListener("click", () => {
        console.log("you clicked the save");
        let userName = document.querySelector("#userName").value;
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;
        let userObj = utilityFunc.createUserObj(userName, email, password);
        console.log(userObj);
        API.saveToApi("users", userObj);
        // targetContainer.innerHTML = ""; --Will clear container upon submit--
      });
    },
    submitMessage: function() {
          let messageValue = document.querySelector("#message-input");
          messageValue.addEventListener("keypress", event => {
            if (event.charCode === 13) {
              postMessage();
              API.getAllFromApi("messages")
              .then(data => {
                targetContainer.innerHTML = "";
                targetContainer.appendChild(userMESSAGE.messageComponent());
                EVENT.submitMessage()
              })
            }
          })
    },
    addRemoveFormatBtns: function (formatButton, deleteButton, editButton) {
      formatButton.addEventListener("click", () => {
        if (deleteButton.style.display === "none") {
          deleteButton.style.display = "block";
        } else {
          deleteButton.style.display = "none";
        }
        if (editButton.style.display === "none") {
          editButton.style.display = "block";
        } else {
          editButton.style.display = "none";
        }
      })
    },
    deleteMessage: function (deleteBtn, chatBox) {
      deleteBtn.addEventListener("click", () => {
        let id = event.target.id;
        chatBox.innerHTML = ""
        API.deleteFromApi("messages", id).then(()=> {
          chatBox.innerHTML = ""
          userMESSAGE.chatBoxComponent()
        })
      })
    },
    editMessage: function (editButton, chatMessage, messageItem) {
      editButton.addEventListener("click", () => {
        // let editContainer = userMESSAGE.editMessageComponent(messageItem).outerHTML;
        // chatMessage.innerHTML = editContainer
        chatMessage.appendChild( userMESSAGE.editMessageComponent(messageItem))
        editButton.setAttribute("disabled", "true")
      })
    },
    editMessageSave: function (saveBtn, chatBox) {
      saveBtn.addEventListener("click", () => {
        let userMessage = document.querySelector("#edit-message-input").value;
        let userID = sessionStorage.getItem("id");
        let updatedMessage = utilityFunc.createMessageObj(userID, userMessage, id)
        let id = event.target.id;
        API.updateApi("messages", updatedMessage, id).then(()=> {
          chatBox.innerHTML = ""
          userMESSAGE.chatBoxComponent()
        })
      })
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
