
    //this function generates the dom elements of the input form and also pushes the current users news to dom. then it calls the save button feature
    import { userMESSAGE } from "./component.js";
    import { EVENT } from "./event.js";
    import { API } from "./api/api_manager.js";
    import { targetContainer } from "./main.js";
    import { eventComponent } from "./eventComponent.js";
    import { friendComponent } from "./friendComponent.js";
    import { loginUserForm } from "./login_register.js";
    import { newsEvents } from "./event.js"
    import { newsFunc, userId } from "./newsComp.js"

const RENDER = {
  renderAllComponents: function() {
    navComponent();
    newsFunc.newsFromApi(userId);
    eventComponent.loadEventBox();
    targetContainer.appendChild(userMESSAGE.messageComponent());
    EVENT.submitMessage();
  },
  insertEventComponent: function(infoArray) {
    for (let i = 0; i < infoArray.length; i++) {
      targetContainer.appendChild(
        eventComponent.createEventComponent(infoArray[i])
      );
    }
  },
  insertFriendComponent: function(infoArray) {
    for (let i = 0; i < infoArray.length; i++) {
      targetContainer.appendChild(
        friendComponent.createFriendList(infoArray[i])
      );
    }
  },
  insertEventForm: function() {
    targetContainer.appendChild(eventComponent.createEventForm());
  },
  getAndDisplayEvents: function(eventObj) {
    // targetContainer.innerHTML = ""
    document.querySelector("#event-list-container").innerHTML = "";
    document.querySelector("#past-event-div").innerHTML = "";
    API.getDatesFromApi("events", eventObj.userId).then(
      this.insertEventComponent
    );
  },
  getAndDisplayFriends: function() {
    // targetContainer.innerHTML = ""
    document.querySelector("#friend-list-container").innerHTML = "";
    // document.querySelector("#past-event-div").innerHTML = ""
    API.getFromApi("users").then(this.insertFriendComponent);
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
    let targetContainer = document.querySelector("#container");
    navBar.innerHTML = ""
    targetContainer.innerHTML = loginUserForm();
    EVENT.loginUserClick();
    EVENT.loginUserKeyup();
    EVENT.registerPageLink();
  });
}

export { RENDER };
