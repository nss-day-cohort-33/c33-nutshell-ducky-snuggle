import { API } from "./api/api_manager"
import {RENDER} from "./render.js"
import {utilityFunc} from "./utility.js"

const targetContainer = document.querySelector("#container")
const userId = parseInt(sessionStorage.getItem("id"))

const eventContainer = document.createElement("div")
eventContainer.setAttribute("id", "event-container")
const eventListContainer = document.createElement("div")
eventListContainer.setAttribute("id", "event-list-container")
eventContainer.appendChild(eventListContainer)

const pastEventDiv = document.createElement("div")
pastEventDiv.setAttribute("id", "past-event-div")
eventContainer.appendChild(pastEventDiv)

const eventComponent = {
    createDynamicHeading: function () {
        const myEventsHeading = document.createElement("h1")
        myEventsHeading.textContent = "My Events"
        eventListContainer.prepend(myEventsHeading)
    },
    loadEventBox: function () {
        const showBtn = document.createElement("button")
        showBtn.textContent = "Show my events"
        const addBtn = document.createElement("button")
        addBtn.textContent = "+"

        targetContainer.appendChild(eventContainer)

        eventContainer.prepend(showBtn)
        eventContainer.prepend(addBtn)

        addBtn.addEventListener("click", () => {
            // eventFormContainer.innerHTML = ""
            this.createEventForm()
            addBtn.setAttribute("class", "hide")
        })

        showBtn.addEventListener("click", () => {
            // eventListContainer.prepend(h1)
            eventListContainer.innerHTML = ""
            pastEventDiv.innerHTML = ""
            this.createDynamicHeading()
            API.getDatesFromApi("events", userId).then(RENDER.insertEventComponent)
        })
    },
    createEventForm: function () {
        const eventFormContainer = document.createElement("div")
        eventFormContainer.setAttribute("id", "event-form-container")
        eventContainer.prepend(eventFormContainer)
        const submitBtn = document.createElement("button")
        submitBtn.textContent = "Add new event"

        eventFormContainer.innerHTML = `
            <fieldset>
                <label for="event-name">Name of event:</label>
                <input type="text" name="event-name" id="event-name">
            </fieldset>
            <fieldset>
                <label for="event-date">Date of event:</label>
                <input type="date" name="event-date" id="event-date">
            </fieldset>
            <fieldset>
                <label for="event-location">Location of event:</label>
                <input type="text" name="event-location" id="event-location">
            </fieldset>
            `
        eventFormContainer.appendChild(submitBtn)

        submitBtn.addEventListener("click", event => {
            const eventName = document.querySelector("#event-name").value
            const eventDate = document.querySelector("#event-date").value
            const eventLocation = document.querySelector("#event-location").value

            const newEvent = utilityFunc.createEventObj(userId, eventName, eventDate, eventLocation)

            API.saveToApi("events", newEvent)
            .then( data => data.json())
            .then( events => {
                // API.getFromApi("event", userId).then(RENDER.insertComponent)
                // loadEventBox()
                RENDER.getAndDisplayEvents(newEvent)
                this.createDynamicHeading()
                console.log("saved")
            })
        })
        return eventContainer
    },
    createEventComponent: function (eventObj) {
        const eventChildDiv = document.createElement("div")
        eventChildDiv.setAttribute("id", `delete-${eventObj.id}`)

        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "delete"
        const editBtn = document.createElement("button")
        editBtn.textContent = "edit"
    // console.log(new Date(eventObj.event_date).getUTCDate())
    // console.log(new Date().getUTCDay())
    // [: new Date() < new Date(eventObj.event_date) ? "next-event":]
        eventChildDiv.innerHTML = `
            <section class="${new Date() > new Date(eventObj.event_date) ? "past-event" : ""}">
                <h3>${eventObj.event_name}</h3>
                <strong>Date:</strong> ${eventObj.event_date}
                <br>
                <strong>Location:</strong> ${eventObj.event_location}
                <br>
            </section>
        `
        deleteBtn.addEventListener("click", () =>{
            console.log("delete")
            API.deleteFromApi("events", eventObj.id)
            .then (data => {
                // API.getFromApi("event", userId).then(RENDER.insertComponent)
                RENDER.getAndDisplayEvents(eventObj)
            })
        })

        editBtn.addEventListener("click", () => {
            let editForm = this.createEditForm(eventObj)
            this.editedComponentToDom(eventChildDiv.id, editForm, eventObj)
        })
        if (new Date() > new Date(eventObj.event_date)) {
            console.log("past")
            pastEventDiv.appendChild(eventChildDiv)
        } else {
            eventListContainer.appendChild(eventChildDiv)

        }
        eventChildDiv.appendChild(editBtn)
        eventChildDiv.appendChild(deleteBtn)


        return eventContainer
    },

    createEditForm: function (eventObj) {
        return `
            <fieldset>
                <input type="hidden" id="event-id" value="${eventObj.id}">
                <label for="event-name-edit">Name of event:</label>
                <input type="text" name="event-name-edit" id="event-name-edit" value="${eventObj.event_name}">
                <br>
                <label for="event-date-edit">Date of event:</label>
                <input type="date" name="event-date-edit" id="event-date-edit" value="${eventObj.event_date}">
                <br>
                <label for="event-location-edit">Location of event:</label>
                <input type="text" name="event-location-edit" id="event-location-edit" value="${eventObj.event_location}">
                <br>
                <button id="save-event-btn">Update Event</button>
            </fieldset>
        `
    },
    editedComponentToDom: function (eventToEdit, editForm, eventObj) {
        document.querySelector(`#${eventToEdit}`).innerHTML = editForm
        document.querySelector("#save-event-btn").addEventListener("click", () => {
            const eventId = parseInt(document.querySelector("#event-id").value)
            const eventName = document.querySelector("#event-name-edit").value
            const eventDate = document.querySelector("#event-date-edit").value
            const eventLocation = document.querySelector("#event-location-edit").value

            const editedEvent = utilityFunc.createEventObj(userId, eventName, eventDate, eventLocation)
    console.log(eventId)
            editedEvent.id = eventId
            API.updateApi("events", editedEvent)
            .then( () => {
                RENDER.getAndDisplayEvents(eventObj)
            })
        })
    }
}

// THIS IS TEMPORARY TO BYPASS LOGIN. DONT FORGET TO TAKE THIS OUT
eventComponent.loadEventBox()

export {eventComponent}