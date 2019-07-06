//facotry functions to support build objects to API

let utilityFunc = {
    createUserObj: function (userName, email, password) {
        return {
            user_name: userName,
            email: email,
            password: password
        }
    },
    createMessageObj: function (userID, userMessage) {
        return {
            userId: userID,
            message: userMessage
        }
    }
}

export {utilityFunc}