
// SN- This was your imports. So messy
import { utilityFunc, getAndDisplayTasks } from "./utility.js";
import { taskComp } from "./component.js";
// SN- this is where you imports stop

//this function generates the dom elements of the input form and also pushes the current users news to dom. then it calls the save button feature
import { userMESSAGE } from "./component.js";
import { EVENT } from "./event.js";
import { API } from "./api/api_manager.js";
import { targetContainer } from "./main.js";
import { eventComponent } from "./eventComponent.js";
import { friendComponent } from "./friendComponent.js";
import { loginUserForm } from "./login_register.js";
import { newsFunc, userId } from "./newsComp.js"




const RENDER = {
    renderAllComponents: function() {
        navComponent();
        newsFunc.newsFromApi(userId);
        eventComponent.loadEventBox();
        friendComponent.loadFriendBox();
        friendComponent.getFriendEvents();
        targetContainer.appendChild(userMESSAGE.messageComponent());
        EVENT.submitMessage();
      },
    insertEventComponent: function(infoArray) {
      for (let i = 0; i < infoArray.length; i++) {
          targetContainer.appendChild(eventComponent.createEventComponent(infoArray[i]));
        }
    },
    insertFriendComponent: function(infoArray) {
        for (let i = 0; i < infoArray.length; i++) {
            targetContainer.appendChild(friendComponent.populateUserList(infoArray[i]));
          }
    },
    insertFriendEvent: function(infoArray) {
        for (let i = 0; i < infoArray.length; i++) {
            targetContainer.appendChild(friendComponent.createFriendEvent(infoArray[i]));
          }
    },
    insertEventForm: function () {
        targetContainer.appendChild(eventComponent.createEventForm())
    },
    getAndDisplayEvents: function (eventObj) {
        // targetContainer.innerHTML = ""
        document.querySelector("#event-list-container").innerHTML = ""
        document.querySelector("#past-event-div").innerHTML = ""
        API.getDatesFromApi("events", eventObj.userId)
        .then(this.insertEventComponent)
    },
    getAndDisplayFriends: function () {
        // targetContainer.innerHTML = ""
        document.querySelector("#friend-list-container").innerHTML = ""
        // document.querySelector("#past-event-div").innerHTML = ""
        API.getFromApi("users")
        .then(this.insertFriendComponent)
    },

   // SN- This is my original render for tasks
   listEntries: function(taskArr) {
    let taskListContainer = document.querySelector("#taskListCont")
    taskListContainer.innerHTML = ""
    taskArr.forEach( task => {
        taskListContainer.appendChild(RENDER.insertTaskComponents(task))
    })
    EVENT.createTaskEditForm()
},

insertMainTaskComponent: function() {
    let mainTaskDiv = document.createElement("div")
    let addTaskDiv = document.createElement("div")
    let taskListDiv = document.createElement("div") //May not need this?
    mainTaskDiv.setAttribute("id", "mainTaskCont")
    addTaskDiv.setAttribute("id", "addFormCont")
    taskListDiv.setAttribute("id", "taskListCont")
    addTaskDiv.innerHTML = taskComp.addTaskForm()
    targetContainer.appendChild(mainTaskDiv)
    let saveBtn = document.createElement("button")
    saveBtn.innerText = "save"
    saveBtn.addEventListener( "click", () => {
        let taskName = document.querySelector("#taskInput").value
        let date = document.querySelector("#taskDate").value
        let userId = 1 // add this later!!!! sessionStorage.getItem("id")
        let fullObj = utilityFunc.createTaskObject(userId, taskName, date)
        API.saveToApi("tasks", fullObj)
        .then( data => getAndDisplayTasks())
    })
    addTaskDiv.appendChild(saveBtn)
    mainTaskDiv.appendChild(addTaskDiv)
    mainTaskDiv.appendChild(taskListDiv)
    getAndDisplayTasks()
},

insertTaskComponents: function(taskArray) {
    let indvTaskDiv = document.createElement("div")
    indvTaskDiv.setAttribute("id", `indvTaskCont-${taskArray.id}`)
    indvTaskDiv.innerHTML = taskComp.createTaskComp(taskArray)
    return indvTaskDiv
},

};

// NAV COMPONENT//

function navComponent() {
  let navBar = document.querySelector("#nav-container");
  let userName = sessionStorage.getItem("user_name");
  let usernameNav = document.createElement("div");
  let logoutNav = document.createElement("div");
  usernameNav.textContent = `Welcome, ${userName}`;
  logoutNav.textContent = "Logout";
  navBar.appendChild(usernameNav);
  navBar.appendChild(logoutNav);
  logoutNav.addEventListener("click", () => {
    sessionStorage.clear()
    let targetContainer = document.querySelector("#container");
    navBar.innerHTML = ""
    targetContainer.innerHTML = loginUserForm();
    EVENT.loginUserClick();
    EVENT.loginUserKeyup();
    EVENT.registerPageLink();
  });
}

export { RENDER };
export { getAndDisplayTasks };