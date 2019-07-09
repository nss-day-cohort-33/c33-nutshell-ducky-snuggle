import { newsEvents } from "./event.js"
import { newsFunc } from "./newsComp.js"
import { API } from "./api/api_manager.js"

let targetContainer = document.querySelector("#container");

const RENDER = {
  insertComponent: function(infoArray, component) {
    for (let i = 0; i < infoArray.length; i++) {
      targetContainer.appendChild(component(infoArray[i]));
    }
  },
  newsFromApi: function (userID) {
    // console.log("userId", userID)
    API.getFromApi("news", userID)
        .then(info => {
            // console.log("this is info", info)
            targetContainer.innerHTML = ""
            targetContainer.appendChild(newsFunc.newsCreateComponent())
            newsEvents.saveNewsBtn()
            info.forEach(info => {
                newsFunc.newToDomComp(info)
            })
        })
  }
};

export { RENDER }
    //this function generates the dom elements of the input form and also pushes the current users news to dom. then it calls the save button feature