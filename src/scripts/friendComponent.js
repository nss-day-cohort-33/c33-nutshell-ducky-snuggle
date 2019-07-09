import { API } from "./api/api_manager";
import {RENDER} from "./render.js"
import {utilityFunc} from "./utility.js"

const targetContainer = document.querySelector("#container")
const userId = parseInt(sessionStorage.getItem("id"))

const friendContainer = document.createElement("div")
friendContainer.setAttribute("id", "friend-container")
const userListContainer = document.createElement("div")
userListContainer.setAttribute("id", "friend-list-container")
const myFriendsContainer = document.createElement("div")
myFriendsContainer.setAttribute("id", "my-friends-container")
const friendEventContainer = document.createElement("div")
friendEventContainer.setAttribute("id", "friend-event-container")
friendContainer.appendChild(userListContainer)
friendContainer.appendChild(myFriendsContainer)
targetContainer.appendChild(friendEventContainer)
const myFriendsH = document.createElement("h1")
myFriendsH.textContent = "My Friends"
myFriendsContainer.appendChild(myFriendsH)


// const searchBtn = document.createElement("button")
// searchBtn.textContent = "Search for friends"

const friendComponent = {
    loadFriendBox: function () {
        targetContainer.appendChild(friendContainer)
        // friendContainer.appendChild(searchBtn)
        // searchBtn.addEventListener("click", () => {
        //     searchBtn.setAttribute("class", "hide")
            // eventListContainer.prepend(h1)
            userListContainer.innerHTML = ""
            // this.createDynamicHeading()
            const friendSearchContainer = document.createElement("div")
            friendSearchContainer.setAttribute("id", "friend-search")
            friendContainer.prepend(friendSearchContainer)
            friendSearchContainer.innerHTML = `
                <fieldset>
                <label for="friend-input">Find friends:</label>
                <input type="text" name="friend-input" id="friend-input" placeholder="Search by username">
                </fieldset>
            `
            API.getFromApi("users", userId).then(RENDER.insertFriendComponent)
            const friendInput = document.querySelector("#friend-input")
            friendInput.addEventListener("keyup", (event) => {
                console.log(friendInput.value)
                const searchTerm = event.target.value
                console.log(searchTerm)
                API.searchUsersApi(searchTerm, userId).then(users => {
                    users.forEach(user => {
                        console.log(users)
                        if(user.user_name.includes(friendInput.value)) {
                            console.log("true")
                            userListContainer.innerHTML = ""
                            RENDER.insertFriendComponent(users)
                        }
                    })
                // })
            })
        })
    },
    populateUserList: function (friendObj) {
        const friendDiv = document.createElement("div")
        friendDiv.setAttribute("id", `friend-${friendObj.id}`)
        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "delete"
        // deleteBtn.setAttribute("class", "hide")
        const addBtn = document.createElement("button")
        addBtn.textContent = "add"
        friendDiv.innerHTML = `
            <p>${friendObj.user_name}</p>
        `
        // API.getFriendsFromApi()
        // .then(users => {
        //     users.forEach(user => {
        //         user.friends.forEach(friend => {
        //             console.log("hello", friend)
        //             if (friend.user === userId) {
        //                 friendDiv.appendChild(addBtn)
        //                 console.log(friend.user)
        //                 // console.log(friend.userId)
        //                 console.log(user.user_name)
        //             } else if (friend.user !== userId) {
        //                 // friendDiv.appendChild(deleteBtn)
        //                 // console.log(friend.user)
        //             }
        //         })
        //     })
        // })
        addBtn.addEventListener("click", () => {
            addBtn.setAttribute("class", "hide")
            deleteBtn.removeAttribute("class")
            const newFriend = utilityFunc.createFriendObj(userId, friendObj.id)
            // friendDiv.innerHTML = ""
            myFriendsContainer.appendChild(friendDiv)
            API.saveToApi("friends", newFriend)
            .then(data => data.json())
            .then(friends => {
                console.log(friends)
                API.getDatesFromApi("events", friends.userId).then(RENDER.insertFriendEvent)
            })
        })
        deleteBtn.addEventListener("click", () => {
            deleteBtn.setAttribute("class", "hide")
            addBtn.removeAttribute("class")
            // console.log(taco)
            // this.removeFromFriendsList(friendObj)
        })

        friendDiv.appendChild(addBtn)
        userListContainer.appendChild(friendDiv)

        return friendContainer
    },
    removeFromFriendsList: function (friendObj) {
        console.log(friendObj)
        API.getFromApi("friends").then(
        API.deleteFromApi("friends", friendObj.id)
            .then(data => {
                console.log("friend deleted")
            })
        )
        return userListContainer
    },
    getFriendEvents: function () {
        API.getFriendsFromApi()
        .then(users => {
            users.forEach(user => {
                user.friends.forEach(friend => {
                    if (friend.user === userId) {
                        // console.log(friend.user)
                        // console.log(friend.userId)
                        console.log(user.user_name)
                        friendEventContainer.innerHTML = ""
                        friendEventContainer.innerHTML = "<h1>My Friends' Events</h1>"
                        API.getDatesFromApi("events", friend.userId).then(RENDER.insertFriendEvent)
                    }
                })
            })
        })
    },
    createFriendEvent: function (eventObj) {
        const friendEventHeading = document.createElement("h2")
        friendEventHeading.textContent = "My Friends' Events"
        friendEventHeading.setAttribute("class", "friend-event-header")
        const eventChildDiv = document.createElement("div")
        eventChildDiv.setAttribute("id", `delete-${eventObj.id}`)
        eventChildDiv.innerHTML = `
            <section id="friend-events-style" class="${new Date() > new Date(eventObj.event_date) ? "past-event" : ""}">
                <h3>${eventObj.event_name}</h3>
                <strong>Date:</strong> ${eventObj.event_date}
                <br>
                <strong>Location:</strong> ${eventObj.event_location}
                <br>
            </section>
        `

        friendEventContainer.appendChild(eventChildDiv)
        // friendEventContainer.appendChild(friendEventHeading)
        return friendEventContainer
    }
}






export {friendComponent}