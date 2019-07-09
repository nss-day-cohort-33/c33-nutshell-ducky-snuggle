
// SN- This was your imports. So messy
import { API } from "./api/api_manager.js";
import { utilityFunc } from "./utility.js";
import { registerUserForm } from "./login_register.js";
import { taskComp } from "./component.js";
import { getAndDisplayTasks } from "./main.js";
import { EVENT } from "./event.js";
// SN- this is where you imports stop


let targetContainer = document.querySelector("#container"); //SN- This is my target container

const render = {
    // SN- This is my original render for tasks
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

}; // SN- This is where it ends




export { render}