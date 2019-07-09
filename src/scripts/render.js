// const RENDER = {
//   insertComponent: function(infoArray) {
//     for (let i = 0; i < infoArray.length; i++) {
//       targetContainer.appendChild(---INSERT DOM BUILDING COMPONONENT FUNCTION ---(infoArray[i]))
//     }
//   }
// };


import { API } from "./api/api_manager.js";
import { utilityFunc } from "./utility.js";
import { registerUserForm } from "./login_register.js";
import { taskComp } from "./component.js";
import { getAndDisplayTasks } from "./main.js";
import { EVENT } from "./event.js";


let targetContainer = document.querySelector("#container");

const render = {
    
    listEntries: function(taskArr) {
        let taskListContainer = document.querySelector("#taskListCont")
        taskArr.forEach( task => {
            taskListContainer.appendChild(render.insertTaskComponents(task))
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
            API.saveToApi("task", fullObj)
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




export { render}