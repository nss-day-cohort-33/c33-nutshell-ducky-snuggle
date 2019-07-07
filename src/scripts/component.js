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
                            targetContainer.appendChild(newsFunc.newsArtComponent())
                            newToDomComp(info)
                        })
                })
        }
        // newsFunc.newsFromApi()
    })
}
let userId = sessionStorage.getItem("id")

function deleteNewsBtn(userId) {
    let allNewsDeleteButtons = document.querySelectorAll(".delete")
    allNewsDeleteButtons.forEach(deleteBtn => {
        deleteBtn.addEventListener("click", () => {
            console.log("delete button", `it works ${userId}`)
            let deleteBtnId = event.target.id.split("-")[3]
            console.log("deleteBtnId", deleteBtnId)
            API.deleteFromApi("news", deleteBtnId)
                .then(data => {
                    targetContainer.innerHTML = ""
                    API.getFromApi("news", userId)
                        .then(info => {
                            targetContainer.appendChild(newsFunc.newsArtComponent())
                            newToDomComp(info)
                        })
                })
        })

    })

}

function newToDomComp(info) {
    info.forEach(element => {
        targetContainer.innerHTML +=
            `
    <div>
    <h3>News Title: ${element.news_title}
    <h4>News Synopsis: ${element.news_synopsis}
    <h4><a href=<${element.news_url} target="_blank">Article</a></h4>
    </div>
    <button class="edit" id="edit-news-button-${element.id}">Edit</button>
    <button class="delete" id="delete-news-button-${element.id}">Delete</button>
    <hr>
    `
    });
}

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
    // },
    // newInputApi: function() {
    //     return `
    //     <div>
    //     <label for="news-title">News Title</label>
    //     <input id="news-title" type="text" placeholder="ex: World Hunger Solved">
    //     <label for="news-synopsis">News Synopsis</label>
    //     <input id="news-synopsis" type="text" placeholder="ex: ">
    //     <label id="news-url">News Url</label>
    //     <input id="news-url" type="url" name="news-address" placeholder="http://">
    //     </div>
    //     `
    //     newsArtFromApi: function (id) {
    //         let userID = sessionStorage.getItem("id")
    //         let newsDiv = document.createElement("div")
    //         let newsLabel = document.createElement("label")
    //         let newsInput = document.createElement("input")
    //         let newsSaveBtn = document.createElement("button")
    //         let header = document.createElement("h1")

    //         let
    //         newsDiv.setAttribute("id", `news-container-${id}`)
    //         header.textContent = "News Articles"

    //     }

    //this function generates the dom elements of the input form and also pushes the current users news to dom. then it calls the save button feature
    newsFromApi: function (userID) {
        API.getFromApi("news", userID)
            .then(info => {
                console.log(info)
                targetContainer.innerHTML = ""
                targetContainer.appendChild(newsFunc.newsArtComponent())
                newToDomComp(info)
                saveNewsBtn()
                deleteNewsBtn(userId)
            })
    },

}
export { newsFunc, newToDomComp }