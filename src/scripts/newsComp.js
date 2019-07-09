import { API } from "./api/api_manager.js"
import { utilityFunc } from "./utility.js"
import { newsEvents } from "./event.js"

// let date = date()
// let timestamp = date.getTime()

let targetContainer = document.querySelector("#container");

function saveNewsBtn() {
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
                    newsFunc.newsFromApi(userId)
                })
        }
        // newsFunc.newsFromApi()
    })
}
let userId = sessionStorage.getItem("id")



function editNewsForm(news) {
    return `
<input id="news-title-edit" type="text" value="${news.news_title}">
<input id="news-edit-id" type="hidden" value="${news.id}">
<input id="news-synopsis-edit" type="text" value="${news.news_synopsis}">
<input id="news-url-edit" type="url" value="${news.news_url}"  >
<button id="update-news-save-btn">Save</button>
`
}
const createEditForm = (where, editform) => {
    document.querySelector(`#${where}`).innerHTML = editform
            newsEvents.editFormListener()
}


// function newToDomComp(info) {
//     let newsAllDiv = document.createElement("div")
//     let newsContainer = document.createElement("div")
//     let newsDeleteBtn = document.createElement("button")
//     let newsEditBtn = document.createElement("button")

//     newsAllDiv.setAttribute("id", "containerId")
//     newsContainer.setAttribute("id", `news-${info.id}`)
//     newsContainer.setAttribute("class", "newsClass")

//     newsDeleteBtn.setAttribute("id", `delete-${info.id}`)
//     newsEditBtn.setAttribute("id", `edit-${info.id}`)
//     newsDeleteBtn.textContent = "Delete"
//     newsDeleteBtn.textContent = "Delete"
//     newsEditBtn.textContent = "Edit"

//     var moment = require("moment");
//     let date = moment(info.news_time).format("MMM Do YYYY");
//     console.log(date)

//     newsContainer.innerHTML +=
//         `
//         <h3>News Title: ${info.news_title}</h4>
//         <h4>News Synopsis: ${info.news_synopsis}</h4>
//         <h4><a href="${info.news_url}" target="_blank">Article</a></h4>
//         <p><em>Date of Entry: ${date}</em></p>

//         <h4>
//     `
//     newsAllDiv.appendChild(newsContainer)
//     targetContainer.appendChild(newsAllDiv)
//     newsContainer.appendChild(newsDeleteBtn)
//     newsContainer.appendChild(newsEditBtn)

//     newsEvents.editDeleteBtnListener(newsAllDiv)
//     // newsAllDiv.addEventListener("click", () => {
//     //     // console.log("delete", "you clicked here")
//     //     if (event.target.id.startsWith("delete")) {
//     //         let id = event.target.id.split("-")[1]
//     //         console.log(id)
//     //         API.deleteFromApi("news", id)
//     //             .then(data => {
//     //                 newsFunc.newsFromApi(userId)

//     //             })
//     //     }
//     //     if (event.target.id.startsWith("edit")) {
//     //         let id = event.target.id.split("edit")[1]
//     //         console.log("edit", id)
//     //         let editForm = editNewsForm(info)
//     //         console.log(editForm)
//     //         createEditForm(newsContainer.id, editForm)

//     //     }
//     // })
// }
// totaldiv.addEventListener("click", () => {
// if
//     console.log("delete button works")
// })

// editDeletebtns(info)
// deleteNewsBtn(info)
// };

let newsFunc = {
    // //function to generate new inputs to the dom
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

    //this function generates the dom elements of the input form and also pushes the current users news to dom. then it calls the save button feature
    newsFromApi: function (userID) {
        // console.log("userId", userID)
        API.getFromApi("news", userID)
            .then(info => {
                // console.log("this is info", info)
                targetContainer.innerHTML = ""
                targetContainer.appendChild(newsFunc.newsCreateComponent())
                saveNewsBtn()
                info.forEach(info => {
                    newsFunc.newToDomComp(info)
                })
            })
    },
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

            <h4>
        `
        newsAllDiv.appendChild(newsContainer)
        targetContainer.appendChild(newsAllDiv)
        newsContainer.appendChild(newsDeleteBtn)
        newsContainer.appendChild(newsEditBtn)

        // newsEvents.editDeleteBtnListener(newsAllDiv)
        newsAllDiv.addEventListener("click", () => {
            // console.log("delete", "you clicked here")
            if (event.target.id.startsWith("delete")) {
                let id = event.target.id.split("-")[1]
                console.log(id)
                API.deleteFromApi("news", id)
                    .then(data => {
                        newsFunc.newsFromApi(userId)

                    })
            }
            if (event.target.id.startsWith("edit")) {
                let id = event.target.id.split("edit")[1]
                console.log("edit", id)
                let editForm = editNewsForm(info)
                console.log(editForm)
                createEditForm(newsContainer.id, editForm)

            }
        })
    },


}

export { newsFunc }