import {registerUserForm, loginUser} from "./login_register.js";
import { EVENT } from "./event.js";
import { taskComp } from "./component.js";
import { render } from "./render.js";
import { API } from "./api/api_manager.js";

console.log(
  "Your Webpack application is set up and ready to go. Please start writing code."
);

render.insertMainTaskComponent()


function getAndDisplayTasks (database, userId) {
  let taskList = document.querySelector("#taskListCont")
  let userIdEl = 1 // add this later!!!! sessionStorage.getItem("id")
  taskList.innerHTML = ""
  API.getFromApi("task", userIdEl)
  .then( Data => render.listEntries(Data))
}

// let addListContainer = document.querySelector("#addTask-container");
// let taskListContainer = document.querySelector("#taskList-container")
// addListContainer.innerHTML += taskComp.addTaskForm()
// taskListContainer.innerHTML += taskComp.createTaskComp(2,"do this","july 4th")
// targetContainer.innerHTML += taskComp.addTaskEditForm("But why?")

// EVENT.createTaskEditForm()

// targetContainer.innerHTML += loginUser();
//registerUserForm;

// EVENT.loginUserBtn();
// EVENT.registerPageLink();

export { getAndDisplayTasks}