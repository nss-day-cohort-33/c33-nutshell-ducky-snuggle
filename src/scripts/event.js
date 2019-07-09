//event listener for the registration submit button//
import { API } from "./api/api_manager.js";
import { utilityFunc } from "./utility.js";
import { registerUserForm } from "./login_register.js";
import { newsFunc } from "./newscomp.js";
import { RENDER } from "./render.js"

let targetContainer = document.querySelector("#container");

const EVENT = {
    loginUserBtn: function () {
        document.querySelector("#login-btn").addEventListener("click", () => {
            let userName = document.querySelector("#login").value;
            let passWord = document.querySelector("#password").value;
            API.loginFromApi(userName).then(user => {
                console.log(user)
                if (user.length === 0) {
                    alert("Username does not exist! Please Register.")
                } else if (user[0].password !== passWord) {
                    alert("Incorrect Password")
                } else if (user[0].user_name === userName && user[0].password === passWord) {
                    sessionStorage.setItem("user_name", user[0].user_name)
                    sessionStorage.setItem("id", user[0].id)
                    let userID = sessionStorage.getItem("id")
                    RENDER.newsFromApi(userID)
                }
            });
        })
    },
    registerPageLink: function () {
        document.querySelector("#register-link").addEventListener("click", () => {
            event.preventDefault();
            targetContainer.innerHTML = registerUserForm();
            EVENT.submitRegBtn();
        });
    },
    submitRegBtn: function () {
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


};

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
                    RENDER.newsFromApi(userId)
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
                        RENDER.newsFromApi(userId)

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
                        RENDER.newsFromApi(userId)
                    })
            }
        })
    }
}

export { EVENT, newsEvents }
  // ****This is the super long way but pretty cool******
  // for (const value of Object.values(users)) {
  //   console.log("object", value.user_name);
  //   if(userName === value.user_name){
  //     sessionStorage.setItem("id", value.id )

  //   }
  //   alert("Username does not exist. Please register!")
  // }
