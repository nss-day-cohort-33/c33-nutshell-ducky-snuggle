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
        let url = `http://localhost:3000/${database}`
        if (userId) {
          url += `?id_ne=${userId}`
        }
        return fetch (url)
        .then( data => data.json() )
    },
    getDatesFromApi: function (database, userId) {
        // ADD SORT BY DATE [&_sort=event_date&_order=asc]
        return fetch(`http://localhost:3000/${database}?userId=${userId}&_sort=event_date&_order=asc`)
        .then(data => data.json())
    },
    getFriendsFromApi: function () {
        return fetch("http://localhost:3000/users?_embed=friends")
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

    searchUsersApi: function (username, userId) {
        let url = `http://localhost:3000/users?q=${username}`
        if (userId) {
          url += `&id_ne=${userId}`
        }
        return fetch(url)
        .then( data => data.json() )
    }
}

export {API}