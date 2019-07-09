//facotry functions to support build objects to API

import { API } from "./api/api_manager.js"
import { RENDER } from "./render.js"

let utilityFunc = { //SN- these are all for tasks currently
    createUserObj: function (userName, email, password) {
        return {
            user_name: userName,
            email: email,
            password: password
        }
    },
    createTaskObject: function (userId, task, date,) {
        return {
            userId: userId,
            task: task,
            date_due: date,
            complete: false
        }
    },
    editedTaskObject: function (userId, task, date, id) {
        return {
            userId: userId,
            task: task,
            date_due: date,
            complete: false,
            id: id
        }
    },
// SN- this is where task utilities ends

    createNewsObj: function (newsTitle, newsSynopsis, newsUrl, userId, timeStamp) {
        return {
            userId: parseInt(userId),
            news_url: newsUrl,
            news_title: newsTitle,
            news_synopsis: newsSynopsis,
            news_time: timeStamp,
        }
    },
            createMessageObj: function (userID, userMessage) {
                return {
                    userId: userID,
                    message: userMessage
                }
            },
            createEventObj: function (userId, eventName, eventDate, eventLocation) {
                return {
                    userId: userId,
                    event_name: eventName,
                    event_date: eventDate,
                    event_location: eventLocation
                }
            },
            createFriendObj: function (userId, friendId) {
                return {
                    user: userId,
                    userId: friendId
                }
            }
        }
    

        function getAndDisplayTasks (database, userId) { //SN
            let taskList = document.querySelector("#taskListCont")
            let userIdEl = 1 // add this later!!!! sessionStorage.getItem("id")
            taskList.innerHTML = ""
            API.getFromApi("tasks", userIdEl)
            .then( Data => RENDER.listEntries(Data))
          }

export { utilityFunc, getAndDisplayTasks }