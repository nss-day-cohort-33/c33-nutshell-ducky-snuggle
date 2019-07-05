//facotry functions to support build objects to API

let utilityFunc = {
    createUserObj: function (userName, email, password) {
        return {
            user_name: userName,
            email: email,
            password: password
        }
    },
    createNewsObj: function (newsTitle, newsSynopsis, newsUrl, userId, timeStamp) {
        return {
            user_id: parseInt(userId),
            news_url: newsUrl,
            news_title: newsTitle,
            news_synopsis: newsSynopsis,
            news_time: timeStamp,
        }
    }
}

export {utilityFunc}