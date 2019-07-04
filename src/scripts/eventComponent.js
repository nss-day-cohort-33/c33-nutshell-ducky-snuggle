import { API } from "./api/api_manager";
import {RENDER} from "./render.js"
import {utilityFunc} from "./utility.js"

function createDynamicHeading () {
    const myEventsHeading = document.createElement("h1")
    myEventsHeading.textContent = "My Events"
    eventListContainer.prepend(myEventsHeading)
}


const targetContainer = document.querySelector("#container")
const userId = parseInt(sessionStorage.getItem("id"))
const eventContainer = document.createElement("div")
eventContainer.setAttribute("id", "event-container")

function loadEventBox () {
    const showBtn = document.createElement("button")
    showBtn.textContent = "Show my events"
    const addBtn = document.createElement("button")
    addBtn.textContent = "+"

    targetContainer.appendChild(eventContainer)

    eventContainer.prepend(showBtn)
    eventContainer.prepend(addBtn)

    addBtn.addEventListener("click", () => {
        // eventFormContainer.innerHTML = ""
        createEventForm()
        addBtn.setAttribute("class", "hide")
    })

    showBtn.addEventListener("click", () =>{
        // eventListContainer.prepend(h1)
        eventListContainer.innerHTML = ""
        pastEventDiv.innerHTML = ""
        createDynamicHeading()
        API.getFromApi("event", userId).then(RENDER.insertComponent)
    })
}

// THIS IS TEMPORARY TO BYPASS LOGIN. DONT FORGET TO TAKE THIS OUT
// loadEventBox()



function createEventForm () {
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

        API.saveToApi("event", newEvent)
        .then( data => data.json())
        .then( dataJS => {
            // API.getFromApi("event", userId).then(RENDER.insertComponent)
            // loadEventBox()
            RENDER.getAndDisplay(newEvent)
            createDynamicHeading()

            console.log("saved")
        })
    })

    return eventContainer
}

const eventListContainer = document.createElement("div")
eventListContainer.setAttribute("id", "event-list-container")
eventContainer.appendChild(eventListContainer)
const pastEventDiv = document.createElement("div")
pastEventDiv.setAttribute("id", "past-event-div")
eventContainer.appendChild(pastEventDiv)

function createEventComponent (eventObj) {
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
    if (new Date() > new Date(eventObj.event_date)) {
        console.log("past")
        pastEventDiv.appendChild(eventChildDiv)
    } else {
        eventListContainer.appendChild(eventChildDiv)

    }
    eventChildDiv.appendChild(editBtn)
    eventChildDiv.appendChild(deleteBtn)


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

// console.log(API.getFromApi("event", userId).sort(function(a, b) {
//     return b.date > a.date;
//   }));

//   function custom_sort(a, b) {
//     return new Date(b.event_date).getTime() - new Date(a.event_date).getTime();
// }
// var your_array = [
//     {lastUpdated: "2010/01/01"},
//     {lastUpdated: "2009/01/01"},
//     {lastUpdated: "2010/07/01"}
// ];

// function sortEvents (eventObj) {
//     (API.getFromApi("event", userId).sort(custom_sort))
// }

// console.log(new Date(eventObj.event_date)+1)


export {createEventForm, createEventComponent, loadEventBox}