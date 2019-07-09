
//SN- this is where my imports start
import {registerUserForm, loginUser} from "./login_register.js";
import { EVENT } from "./event.js";
import { taskComp } from "./component.js";
import { render } from "./render.js";
import { API } from "./api/api_manager.js";
//SN- This is where they end

// SN- This is how I'm rendering it. I will probably need to move this

render.insertMainTaskComponent() //SN


function getAndDisplayTasks (database, userId) { //SN
  let taskList = document.querySelector("#taskListCont")
  let userIdEl = 1 // add this later!!!! sessionStorage.getItem("id")
  taskList.innerHTML = ""
  API.getFromApi("task", userIdEl)
  .then( Data => render.listEntries(Data))
}

EVENT.completedCheckMark() //SN

// SN- This is where task ends on main

export { getAndDisplayTasks}