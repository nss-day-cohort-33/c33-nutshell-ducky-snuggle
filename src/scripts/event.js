//event listener for the registration submit button//
import { API } from "./api/api_manager.js";
import { utilityFunc } from "./utility.js";
import { registerUserForm } from "./login_register.js";
import { taskComp } from "./component.js";
import { objectManager } from "./api/objet_manager";
import { render } from "./render.js";
import { getAndDisplayTasks } from "./main.js"

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
          // targetContainer.innerHTML = ""
          // API.getFromApi("message", userID)
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
    },

  createTaskEditForm: function() {
    let container = document.querySelector("#taskListCont")
    container.addEventListener("click", () =>{
      if(event.target.id.startsWith("taskComp")){
        console.log("this was clicked")
        let targetId = event.target.id.split("-")[1]
        objectManager.getTaskFromApi("task", targetId )
        .then( data => {
          data.forEach( data => {
          let editForm = taskComp.addTaskEditForm(data)
          let divToEmpty = document.getElementById(`indvTaskCont-${targetId}`)
          divToEmpty.innerHTML = ""
          divToEmpty.innerHTML = editForm
        })
        })
      }
      if(event.target.id.includes("editTask")){
        let target = event.target
        target.addEventListener("keypress", () => {
          if (event.charCode === 13){
            let date = document.querySelector("#editTaskInputDate").value
            let userId = 1 //change with session storage
            let id = document.querySelector("#editTaskInputId").value
            let task = document.querySelector("#editTaskInputText").value
            let newObj = utilityFunc.editedTaskObject(userId, task, date, id)
            API.updateApi("task", id, newObj)
          }
          let userId = 1 //change to session storage
          getAndDisplayTasks("task", userId) 
        })
      }
    })
    },

    completedCheckMark: function () {
      let checkBox = document.querySelectorAll("input[type= checkbox]")
      console.log(checkBox)
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


      //   if(event.target.id.includes("Date")){
      //     let target = event.target
      //     let text = target.innerText
      //     target.innerHTML = taskComp.addTaskEditForm("date", text)
      //     target.addEventListener("keypress", () => {
      //       if (event.charCode === 13){
      //         console.log("this was clicked")
      //         let dateInput = document.querySelector("#editInput")
      //         let date = dateInput.value
      //         let idDate = target.id.split("-")[1]
      //         objectManager.getTaskFromApi("task", idDate )
      //         .then(data => {
      //           console.log(data)
      //         })
      //       }
      //     })
      //   }
      //   else if(event.target.id.includes("taskComp")){
      //     let target = event.target
      //     let text = target.innerText
      //     target.innerHTML = taskComp.addTaskEditForm("text", text)
      //     target.addEventListener("keypress", () => {
      //       if (event.charCode === 13){
      //         console.log("this was clicked")
      //         let input = document.querySelector("#editInput")
      //         let task = input.value
      //         let idText = target.id.split("-")[1]
      //         console.log(idText)
      //       }
      //   })
      // }