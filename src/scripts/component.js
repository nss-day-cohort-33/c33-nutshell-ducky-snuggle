// let date = date()
// let timestamp = date.getTime()
let newsFunc = {
    // //function to generate new inputs to the dom
    // newsArtComponent: function () {
    //     let newsDiv = document.createElement("div")
    //     let newsLabel = document.createElement("label")
    //     let newsInput = document.createElement("input")
    //     let newsSaveBtn = document.createElement("button")
    //     newsDiv.setAttribute("class", "news-arts")
    //     newsDiv.setAttribute("id", "news-arts")

    //     let newNewsArt = `
    // <input id="news-title" type="text" placeholder="ex: World Hunger Solved">
    // <input id="news-synopsis" type="text" placeholder="ex: "
    // <input <a href=<input id="news-url" type="url"> /a>
    //     `
    //     newsDiv.innerHTML = newNewsArt;
    //     newsSaveBtn.textContent = "save";
    //     newsDiv.appendChild(newsSaveBtn)
    //     return newsDiv
    // },
    newInputApi: function() {
        return `
        <div>
        <label for="news-title">News Title</label>
        <input id="news-title" type="text" placeholder="ex: World Hunger Solved">
        <label for="news-synopsis">News Synopsis</label>
        <input id="news-synopsis" type="text" placeholder="ex: ">
        <label id="news-url">News Url</label>
        <input id="news-url" type="url" name="news-address" placeholder="http://">
        </div>
        `
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