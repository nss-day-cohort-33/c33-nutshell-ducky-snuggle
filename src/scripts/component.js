// let date = date()
// let timestamp = date.getTime()
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
        // let newsSaveBtnTitle = document.createElement("button")
        // let newsSaveBtnSynopsis = document.createElement("button")
        // let newsSaveBtnUrl = document.createElement("button")

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

        newsDiv.appendChild(newsLabelTitle)
        newsDiv.appendChild(newsInputTitle)

        newsDiv.appendChild(newsLabelSynopsis)
        newsDiv.appendChild(newsInputSynopsis)

        newsDiv.appendChild(newsLabelUrl)
        newsDiv.appendChild(newsInputUrl)

        return newsDiv
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
    },
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

    newsFromApi: function(entry) {
        return `
        <h1>News Articles<h1>
        <h3>News Title: ${entry.news_title}
        <h4>News Synopsis: ${entry.news_synopsis}
        <p><a href=<${entry.news_url} type="url"> Article </a></p>
        `
    }
}
export { newsFunc }