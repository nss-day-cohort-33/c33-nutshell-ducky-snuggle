import { API } from "./api/api_manager";
import {RENDER} from "./render.js"
import {utilityFunc} from "./utility.js"

const targetContainer = document.querySelector("#container")
const userId = parseInt(sessionStorage.getItem("id"))

const friendContainer = document.createElement("div")
friendContainer.setAttribute("id", "friend-container")
const friendListContainer = document.createElement("div")
friendListContainer.setAttribute("id", "friend-list-container")
friendContainer.appendChild(friendListContainer)

const friendComponent = {
    loadFriendBox: function () {
        const searchBtn = document.createElement("button")
        searchBtn.textContent = "Search for friends"
        targetContainer.appendChild(friendContainer)
        friendContainer.appendChild(searchBtn)

        searchBtn.addEventListener("click", () => {
            searchBtn.setAttribute("class", "hide")
            // eventListContainer.prepend(h1)
            friendListContainer.innerHTML = ""
            // this.createDynamicHeading()
            const friendSearchContainer = document.createElement("div")
            friendContainer.appendChild(friendSearchContainer)
            friendSearchContainer.innerHTML = `
                <fieldset>
                <label for="friend-input">Username:</label>
                <input type="text" name="friend-input" id="friend-input">
                </fieldset>
            `
            API.getFromApi("users").then(RENDER.insertFriendComponent)
            const friendInput = document.querySelector("#friend-input")
            friendInput.addEventListener("keyup", (event) => {
                console.log(friendInput.value)
                const searchTerm = event.target.value
                console.log(searchTerm)
                API.searchUsersApi(searchTerm).then(users => {
                    users.forEach(user => {
                        console.log(users)
                        if(user.user_name.includes(friendInput.value)) {
                            console.log("true")
                            friendListContainer.innerHTML = ""
                            RENDER.insertFriendComponent(users)
                        }
                    })
                })
            })
        })
    },
    createFriendList: function (friendObj) {
        const friendDiv = document.createElement("div")
        friendDiv.setAttribute("id", `friend-${friendObj.id}`)
        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "delete"
        const addBtn = document.createElement("button")
        addBtn.textContent = "add"
        friendDiv.innerHTML = `
            <p>${friendObj.user_name}</p>
        `
        friendDiv.appendChild(deleteBtn)
        friendDiv.appendChild(addBtn)
        friendListContainer.appendChild(friendDiv)
        return friendListContainer
    }
}



friendComponent.loadFriendBox()

export {friendComponent}