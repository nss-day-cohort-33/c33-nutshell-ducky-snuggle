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
        // ADD SORT BY DATE [&_sort=event_date&_order=asc]
        return fetch(`http://localhost:3000/${database}?user_id=${userId}&_sort=event_date&_order=asc`)
        .then(data => data.json())
    },

    updateApi: function (database, info) {
        return fetch(`http://localhost:3000/${database}/${info.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        })
    },
    loginFromApi: function (username) {
        return fetch(`http://localhost:3000/user?user_name=${username}`)
        .then(data => data.json())
    },
}

export {API}