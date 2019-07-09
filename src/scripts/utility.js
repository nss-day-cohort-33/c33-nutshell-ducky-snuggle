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
            userId: parseInt(userId),
            news_url: newsUrl,
            news_title: newsTitle,
            news_synopsis: newsSynopsis,
            news_time: timeStamp,
        }
    },
            createMessageObj: function (userID, userMessage) {
                return {
                    userId: userID,
                    message: userMessage
                }
            },
            createEventObj: function (userId, eventName, eventDate, eventLocation) {
                return {
                    userId: userId,
                    event_name: eventName,
                    event_date: eventDate,
                    event_location: eventLocation
                }
            },
            createFriendObj: function (userId, friendId) {
                return {
                    user: userId,
                    userId: friendId
                }
            }
        }
    

export { utilityFunc }