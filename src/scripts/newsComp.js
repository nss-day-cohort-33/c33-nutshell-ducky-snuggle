import { API } from "./api/api_manager.js"
import { utilityFunc } from "./utility.js"

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
                    targetContainer.innerHTML = ""
                    API.getFromApi("news", userId)
                        .then(info => {
                            console.log(info)
                            targetContainer.appendChild(newsFunc.newsArtComponent())
                            info.forEach(info => {
                                newToDomComp(info)
                            })
                        })
                })
        }
        // newsFunc.newsFromApi()
    })
}
let userId = sessionStorage.getItem("id")



function editNewsBtn(id) {
    let allEditNewsBtn = document.querySelectorAll(".edit-news-btn")
    allEditNewsBtn.forEach(editBtn => {
        editBtn.addEventListener("click", () => {
            console.log("edit button", "it works")
            let editBtnId = event.target.id.split("-")[3]
            console.log("editBtnId", editBtnId)
        })
    })
}

// function deleteNewsBtn(info) {
//     let selectAllDiv = document.querySelector("#containerId")

    function newToDomComp(info) {
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

    newsContainer.innerHTML +=
        `
        <h3>News Title: ${info.news_title}
        <h4>News Synopsis: ${info.news_synopsis}
    <h4><a href="${info.news_url}" target="_blank">Article</a></h4>
    `
    newsAllDiv.appendChild(newsContainer)
    targetContainer.appendChild(newsAllDiv)
    newsContainer.appendChild(newsDeleteBtn)
    newsContainer.appendChild(newsEditBtn)

    newsAllDiv.addEventListener("click", () => {
        console.log("you clicked here")
        if (event.target.id.startsWith("delete")) {
            let id = event.target.id.split("-")[1]
            console.log(id)
            API.deleteFromApi("news", id)
                .then(data => {
                    targetContainer.innerHTML = ""
                    API.getFromApi("news", userId)
                        .then(info => {
                            targetContainer.appendChild(newsFunc.newsArtComponent())
                            info.forEach(info => {
                                newToDomComp(info)
                            })
                        })
                })
            }
        })
    newsAllDiv.addEventListener("click", () => {
        
    })
}
    // totaldiv.addEventListener("click", () => {
    // if
    //     console.log("delete button works")
    // })

    // editDeletebtns(info)
    // deleteNewsBtn(info)
// };

let newsFunc = {
    // //function to generate new inputs to the dom
    newsArtComponent: function () {
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
        API.getFromApi("news", userID)
            .then(info => {
                console.log("this is info", info)
                targetContainer.innerHTML = ""
                targetContainer.appendChild(newsFunc.newsArtComponent())
                saveNewsBtn()
                info.forEach(info => {
                    // console.log("loop over info", info)
                    newToDomComp(info)
                    // editNewsBtn()
                })
            })
    },

}

// function editDeletebtns(info) {
//     let newsContainer = document.createElement("div")
//     let newsDeleteBtn = document.createElement("button")
//     let newsEditBtn = document.createElement("button")
//     newsContainer.setAttribute("id", `news-${info.id}`)
//     newsContainer.setAttribute("class", "newsClass")

//     newsDeleteBtn.textContent = "Delete"
//     newsEditBtn.textContent = "Edit"
//     newsContainer.appendChild(newsDeleteBtn)
//     newsContainer.appendChild(newsEditBtn)

//     targetContainer.appendChild(newsContainer)
//     return newsContainer
// }


// <button class="edit-news-btn" id="edit-news-button-${element.id}">Edit</button>
// <button class="delete-news-btn" id="delete-news-button-${element.id}">Delete</button>

export { newsFunc }