//facotry functions to support build objects to API

let utilityFunc = {
    createUserObj: function (userName, email, password) {
        return {
            user_name: userName,
            email: email,
            password: password
        }
    },
    createTaskObject: function (userId, task, date,) {
        return {
            user_id: userId,
            task: task,
            date_due: date,
            complete: false,
        }
    }
}


export {utilityFunc}