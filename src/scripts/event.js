import { API } from "./api/api_manager.js";
import { utilityFunc, getAndDisplayTasks } from "./utility.js";
import { registerUserForm } from "./login_register.js";
import { taskComp } from "./component.js";
import { objectManager } from "./api/objet_manager";
import { newsFunc, masterNewsDiv } from "./newsComp.js";
import { userMESSAGE } from "./component.js"
import { postMessage } from "./api/objet_manager.js"
import { RENDER } from "./render.js"


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
          RENDER.renderAllComponents()
          //--The Event Listener for Messages should not have to be in this EVENT --//
        }
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
    // submitRegBtn: function() {
    //   document.querySelector("#submit-reg-btn").addEventListener("click", () => {
    //       console.log("logged in")
    //       // API.getFromApi("event", userID).then(RENDER.insertComponent)
    //       // createEventForm()
    //       // eventComponent.loadEventBox()
    //     });
    //   },
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
      });
    },
    submitReg: function() {
      // document.querySelector("#submit-reg-btn").addEventListener("click", () => {
        console.log("you clicked the save");
        let userName = document.querySelector("#userName").value;
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;
        let userObj = utilityFunc.createUserObj(userName, email, password);
        console.log(userObj);
        API.searchUsersApi(userName).then(user => {
            if (user.length === 0){
              API.searchUsersApi(email).then(email => {
                if (email.length === 0) {
                  console.log(userObj);
                  API.saveToApi("users", userObj)
                  .then(() => {
                    sessionStorage.setItem("user_name", userName)
                    let userID = sessionStorage.getItem("id")
                    sessionStorage.setItem("id", userID)
                    targetContainer.innerHTML = ""
                    console.log("logged in")
                  })
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
        // targetContainer.innerHTML = ""; --Will clear container upon submit--
      },
 // *****SN- this is where the task events start
  createTaskEditForm: function() { //SN
    let container = document.querySelector("#taskListCont")
    container.addEventListener("click", () =>{
      if(event.target.id.startsWith("taskComp")){
        console.log("this was clicked")
        let targetId = event.target.id.split("-")[1]
        objectManager.getTaskFromApi("tasks", targetId )
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
          // console.log(event.charCode)
          if (event.charCode === 13){
            let date = document.querySelector("#editTaskInputDate").value
            let userId = 1 //change with session storage
            let id = document.querySelector("#editTaskInputId").value
            let task = document.querySelector("#editTaskInputText").value
            let newObj = utilityFunc.editedTaskObject(userId, task, date, id)
            console.log("newObj", newObj)
            API.updateApi("tasks", newObj)
            .then( () => {getAndDisplayTasks("tasks", userId)})
          }
        })
      }
    })
    },

    // **** SN- This Is the beginning of task checkbox

    // completedCheckMark: function () { //SN
    //   let checkBox = document.querySelectorAll("input[type= checkbox]")
    //   console.log(checkBox)
    // } **** SN- this is the code to reference for the checkbox
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



  // SN- This was for friends, they are still doing stuff THIS IS THE BOTTOM
        // API.searchUsersApi(userName).then(user => {
        //   if (user.length === 0){
        //     API.searchUsersApi(email).then(email => {
        //       if (email.length === 0) {
        //         console.log(userObj);
        //         API.saveToApi("users", userObj)
        //         .then(() => {
        //           sessionStorage.setItem("user_name", userName)
        //           let userID = sessionStorage.getItem("id")
        //           sessionStorage.setItem("id", userID)
        //           targetContainer.innerHTML = ""
        //           console.log("logged in")
        //         })
        //       // loadEventBox()
        //       } else if (email === user[0].email) {
        //           alert(`There's an existing account registered under ${email}. Please try again.`)
        //       }
        //     })
        //   } else if (!userName || !email || !password) {
        //       alert("Please complete all fields.")
        //   } else if(userName === user[0].user_name && email === user[0].email) {
        //       alert("You are already registered. Please login.")
        //   } else if (user[0].email === email) {
        //       alert(`There's an existing account registered under ${email}. Please try again.`)
        //   } else if (userName === user[0].user_name) {
        //       alert(`${userName} is already taken. Please try again.`)
        //   }
        // });
    // },
    submitMessage: function() {
          let messageValue = document.querySelector("#message-input");
          messageValue.addEventListener("keypress", event => {
            if (event.charCode === 13) {
              postMessage();
              API.getAllFromApi("messages")
              .then(data => {
                let chatBox = document.querySelector("#chat-box")
                // let navBar = document.querySelector("#nav-container")
                // navBar.innerHTML = ""
                // targetContainer.innerHTML = "";
                // RENDER.renderAllComponents();
                chatBox.innerHTML = ""
                userMESSAGE.chatBoxComponent()
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
        let updatedMessage = utilityFunc.createMessageObj(userID, userMessage)
        let eventId = event.target.id;
        updatedMessage.id = eventId
        console.log(updatedMessage)
        API.updateApi("messages", updatedMessage).then(()=> {
          chatBox.innerHTML = ""
          userMESSAGE.chatBoxComponent()
        })
      })
    }
    // eventComponent.loadEventBox()
  };

  // NEED TO FIND BETTER PLACE FOR THIS
  function makeRegId () {
    API.getFromApi("users").then(user => {
      return user.length + 1
    })
  }

  let newsEvents = {
    // event listener for the edit button to put to the API
    editFormListener: function () {
        document.querySelector("#update-news-save-btn").addEventListener("click", () => {
            let newsTitleUp = document.querySelector("#news-title-edit").value
            let newsSynUp = document.querySelector("#news-synopsis-edit").value
            let newsUrlUp = document.querySelector("#news-url-edit").value
            let newsIdUp = document.querySelector("#news-edit-id").value
            let userId = sessionStorage.getItem("id")
            let newsTimeUp = Date.now()
            let updateNewsObj = utilityFunc.createNewsObj(newsTitleUp, newsSynUp, newsUrlUp, userId, newsTimeUp)
            updateNewsObj.id = newsIdUp
            console.log("updateObj", updateNewsObj)
            API.updateApi("news", updateNewsObj)
                .then(() => {
                    masterNewsDiv.innerHTML=""
                    newsFunc.newsFromApi(userId)
                })
            })
        },
        // event listener for the delete button
        editDeleteBtnListener: function (element, info, newsContainer, userId) {
            element.addEventListener("click", () => {
                // console.log("delete", "you clicked here")
                if (event.target.id.startsWith("delete")) {
                    let id = event.target.id.split("-")[1]
                    console.log(id)
                    API.deleteFromApi("news", id)
                    .then(data => {
                        masterNewsDiv.innerHTML=""
                        newsFunc.newsFromApi(userId)

                    })
                }
                if (event.target.id.startsWith("edit")) {
                    let id = event.target.id.split("edit")[1]
                    console.log("edit", id)
                    let editForm = newsFunc.editNewsForm(info)
                    console.log(editForm)
                newsFunc.createEditForm(newsContainer.id, editForm)
            }
        })
    },
    //this saves a new post to the database
    saveNewsBtn: function () {
        document.querySelector("#save-btn").addEventListener("click", () => {
            console.log("Save Button", "it works")
            let newsTitle = document.querySelector("#news-title").value;
            let newsSynopsis = document.querySelector("#news-synopsis").value;
            let newsUrl = document.querySelector("#news-url").value;
            let userId = sessionStorage.getItem("id")
            let timeStamp = Date.now()
            let newsAPISave = utilityFunc.createNewsObj(newsTitle, newsSynopsis, newsUrl, userId, timeStamp)
            if (newsTitle === "" || newsSynopsis === "" || newsUrl === "") {
                alert("Please fill in blank space")
            } else {
                API.saveToApi("news", newsAPISave)
                    .then(newsAPI => {
                        masterNewsDiv.innerHTML=""
                        newsFunc.newsFromApi(userId)
                    })
            }
        })
    }
}

export { EVENT, newsEvents }


