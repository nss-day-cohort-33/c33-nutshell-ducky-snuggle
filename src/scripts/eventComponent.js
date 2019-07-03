import { API } from "./api/api_manager";
import {RENDER} from "./render.js"
import {utilityFunc} from "./utility.js"

const targetContainer = document.querySelector("#container")
const userId = parseInt(sessionStorage.getItem("id"))

function createEventForm () {
    const eventFormContainer = document.createElement("div")
    eventFormContainer.setAttribute("id", "event-form-container")
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

        API.saveToApi("event", newEvent)
        .then( data => data.json())
        .then( dataJS => {
            // API.getFromApi("event", userId).then(RENDER.insertComponent)
            RENDER.getAndDisplay(newEvent)
            console.log("saved")
        })
    })

    return eventFormContainer
}

const eventContainer = document.createElement("div")
eventContainer.setAttribute("id", "event-container")

function createEventComponent (eventObj) {
    const eventChildDiv = document.createElement("div")
    eventChildDiv.setAttribute("id", `delete-${eventObj.id}`)
    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "delete"
    const editBtn = document.createElement("button")
    editBtn.textContent = "edit"

    eventChildDiv.innerHTML = `
            <h3>${eventObj.event_name}</h3>
            <strong>Date:</strong> ${eventObj.event_date}
            <br>
            <strong>Location:</strong> ${eventObj.event_location}
            <br>
    `
    deleteBtn.addEventListener("click", () =>{
        console.log("delete")
        API.deleteFromApi("event", eventObj.id)
        .then (data => {
            // API.getFromApi("event", userId).then(RENDER.insertComponent)
            RENDER.getAndDisplay(eventObj)
        })
    })

    editBtn.addEventListener("click", () => {
        let editForm = createEditForm(eventObj)
        editedComponentToDom(eventChildDiv.id, editForm, eventObj)
    })

    eventChildDiv.appendChild(editBtn)
    eventChildDiv.appendChild(deleteBtn)
    eventContainer.appendChild(eventChildDiv)
    return eventContainer
}

function createEditForm (eventObj) {
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
}

function editedComponentToDom (eventToEdit, editForm, eventObj) {
    document.querySelector(`#${eventToEdit}`).innerHTML = editForm
    document.querySelector("#save-event-btn").addEventListener("click", () => {
        const eventId = parseInt(document.querySelector("#event-id").value)
        const eventName = document.querySelector("#event-name-edit").value
        const eventDate = document.querySelector("#event-date-edit").value
        const eventLocation = document.querySelector("#event-location-edit").value

        const editedEvent = utilityFunc.createEventObj(userId, eventName, eventDate, eventLocation)
console.log(eventId)
        editedEvent.id = eventId
        API.updateApi("event", editedEvent)
        .then( () => {
            RENDER.getAndDisplay(eventObj)
        })
    })
}


export {createEventForm, createEventComponent}