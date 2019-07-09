import { taskList } from "../render";

const API = {
    saveToApi: function (database, info) {
        return fetch(`http://localhost:3000/${database}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        })
    },

    deleteFromApi: function (database, id) {
        return fetch(`http://localhost:3000/${database}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
    },

    getFromApi: function (database, userId) {
        return fetch(`http://localhost:3000/${database}?user_id=${userId}`)
        .then(data => data.json())
    },

    //SN - this is your put call it may be different

    updateApi: function (database, id, editedObject) { //SN
        return fetch(`http://localhost:3000/${database}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedObject)
        })
        .then(res => res.json())
    },


    loginFromApi: function (username) {
        return fetch(`http://localhost:3000/user?user_name=${username}`)
        .then(data => data.json())
    }
   
}



export {API}