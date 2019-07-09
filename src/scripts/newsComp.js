import { newsEvents } from "./event.js"


let targetContainer = document.querySelector("#container");

let userId = sessionStorage.getItem("id")


let newsFunc = {
    // //function to generate new divs to the dom
    newsCreateComponent: function () {
        let newsDiv = document.createElement("div")
        let newsLabelTitle = document.createElement("label")
        let newsInputTitle = document.createElement("input")
        let newsLabelSynopsis = document.createElement("label")
        let newsInputSynopsis = document.createElement("input")
        let newsLabelUrl = document.createElement("label")
        let newsInputUrl = document.createElement("input")
        let newsSaveBtn = document.createElement("button")


        newsDiv.setAttribute("id", "news-id")

        newsLabelTitle.setAttribute("for", "news-title")
        newsLabelTitle.textContent = "News Title:"
        newsInputTitle.setAttribute("id", "news-title")
        newsInputTitle.setAttribute("type", "text")
        newsInputTitle.setAttribute("placeholder", "ex: World Hunger Solved")

        newsLabelSynopsis.setAttribute("for", "news-synopsis")
        newsLabelSynopsis.textContent = "News Synopsis:"
        newsInputSynopsis.setAttribute("id", "news-synopsis")
        newsInputSynopsis.setAttribute("type", "text")
        newsInputSynopsis.setAttribute("placeholder", "ex:")

        newsLabelUrl.setAttribute("for", "news-url")
        newsLabelUrl.textContent = "News Url:"
        newsInputUrl.setAttribute("id", "news-url")
        newsInputUrl.setAttribute("type", "url")
        newsInputUrl.setAttribute("name", "news-addresss")
        newsInputUrl.setAttribute("placeholder", "http://")

        newsSaveBtn.setAttribute("id", "save-btn")
        newsSaveBtn.textContent = "Save "

        newsDiv.innerHTML = "<h1>News Articles<h1>"
        newsDiv.appendChild(newsLabelTitle)
        newsDiv.appendChild(newsInputTitle)

        newsDiv.appendChild(newsLabelSynopsis)
        newsDiv.appendChild(newsInputSynopsis)

        newsDiv.appendChild(newsLabelUrl)
        newsDiv.appendChild(newsInputUrl)

        newsDiv.appendChild(newsSaveBtn)

        return newsDiv
    },
    //this function generate new divs to the dom to target the edit/delete button and holds the edit/delete button
     newToDomComp: function (info) {
        let newsAllDiv = document.createElement("div")
        let newsContainer = document.createElement("div")
        let newsDeleteBtn = document.createElement("button")
        let newsEditBtn = document.createElement("button")

        newsAllDiv.setAttribute("id", "containerId")
        newsContainer.setAttribute("id", `news-${info.id}`)
        newsContainer.setAttribute("class", "newsClass")

        newsDeleteBtn.setAttribute("id", `delete-${info.id}`)
        newsEditBtn.setAttribute("id", `edit-${info.id}`)
        newsDeleteBtn.textContent = "Delete"
        newsEditBtn.textContent = "Edit"

        var moment = require("moment");
        let date = moment(info.news_time).format("MMM Do YYYY");
        console.log(date)

        newsContainer.innerHTML +=
            `
            <h3>News Title: ${info.news_title}</h4>
            <h4>News Synopsis: ${info.news_synopsis}</h4>
            <h4><a href="${info.news_url}" target="_blank">Article</a></h4>
            <p><em>Date of Entry: ${date}</em></p>
        `
        newsAllDiv.appendChild(newsContainer)
        targetContainer.appendChild(newsAllDiv)
        newsContainer.appendChild(newsDeleteBtn)
        newsContainer.appendChild(newsEditBtn)

        newsEvents.editDeleteBtnListener(newsAllDiv, info, newsContainer, userId)
    },
    //creates the edit form when the event listener hits
    createEditForm: (where, editform) => {
        document.querySelector(`#${where}`).innerHTML = editform
                newsEvents.editFormListener()
    },
    //this is the edit form
    editNewsForm: function (news) {
        return `
    <input id="news-title-edit" type="text" value="${news.news_title}">
    <input id="news-edit-id" type="hidden" value="${news.id}">
    <input id="news-synopsis-edit" type="text" value="${news.news_synopsis}">
    <input id="news-url-edit" type="url" value="${news.news_url}"  >
    <button id="update-news-save-btn">Save</button>
    `
    }
}

export { newsFunc }