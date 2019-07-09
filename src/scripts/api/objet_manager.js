

//SN- This is your call to get a specific task from API

const objectManager = { //SN- task object Manager
    getTaskFromApi: function (database, Id) {
        return fetch(`http://localhost:3000/${database}?id=${Id}`)
        .then(data => data.json())
    },
}

export { objectManager }