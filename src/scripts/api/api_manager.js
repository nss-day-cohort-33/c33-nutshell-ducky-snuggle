
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
    getAllFromApi: function (database, queryParams) {
        let url = `http://localhost:3000/${database}`
        if (queryParams) {
          url += `?${queryParams}`
        }
        return fetch(url)
        .then( data => data.json() )
      },
    getFromApi: function (database, userId) {
        let url = `http://localhost:3000/${database}`
        if (userId) {
          url += `?id_ne=${userId}`
        }
        return fetch (url)
        .then( data => data.json() )
    },
    getNewsFromApi: function (database, userId) {
        return fetch(`http://localhost:3000/${database}?userId=${userId}&_sort=news_time&_order=desc`)
        .then( data => data.json() )
    },
    getDatesFromApi: function (database, userId) {
        // ADD SORT BY DATE [&_sort=event_date&_order=asc]
        return fetch(`http://localhost:3000/${database}?userId=${userId}&_sort=event_date&_order=asc`)
        .then(data => data.json())
    },

    //SN - this is your put call it may be different

    // updateApi: function (database, id, editedObject) { //SN
    //     return fetch(`http://localhost:3000/${database}/${id}`, {

    updateApi: function (database, info) { 
        return fetch(`http://localhost:3000/${database}/${info.id}`, { 
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        })
        .then(res => res.json())
    },


    loginFromApi: function (username) {
        return fetch(`http://localhost:3000/users?user_name=${username}`)
        .then(data => data.json())
    },
   

    searchUsersApi: function (username, userId) {
        let url = `http://localhost:3000/users?q=${username}`
        if (userId) {
          url += `&id_ne=${userId}`
        }
        return fetch(url)
        .then( data => data.json() )
    }
};



export {API}