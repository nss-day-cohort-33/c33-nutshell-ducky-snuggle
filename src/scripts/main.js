import { loginUser } from "./login_register.js";
import { EVENT } from "./event.js";
import { taskComp } from "./component.js";

console.log(
  "Your Webpack application is set up and ready to go. Please start writing code."
);

let addListContainer = document.querySelector("#addTask-container");
let taskListContainer = document.querySelector("#taskList-container")
addListContainer.innerHTML += taskComp.addTaskForm()
taskListContainer.innerHTML += taskComp.createTaskComp(2,"do this","july 4th")
// targetContainer.innerHTML += taskComp.addTaskEditForm("But why?")

EVENT.createTaskEditForm()

// EVENT.loginUserBtn();
// EVENT.registerPageLink();
