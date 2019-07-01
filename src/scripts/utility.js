//facotry functions to support build objects to API

let utilityFunc = {
    createUserObj: function (userName, email) {
        return {
            user_name: userName,
            email: email
        }
    }
}

export {utilityFunc}