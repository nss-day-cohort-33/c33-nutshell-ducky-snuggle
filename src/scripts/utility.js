//facotry functions to support build objects to API

let utilityFunc = {
    createUserObj: function (userName, email, password) {
        return {
            user_name: userName,
            email: email,
            password: password
        }
    },
    createEventObj: function (userId, eventName, eventDate, eventLocation) {
        return {
            user_id: userId,
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




export {utilityFunc}