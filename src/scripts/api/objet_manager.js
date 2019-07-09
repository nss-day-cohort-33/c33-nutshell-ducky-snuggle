const objectManager = {
    getTaskFromApi: function (database, Id) {
        return fetch(`http://localhost:3000/${database}?id=${Id}`)
        .then(data => data.json())
    },
}

export { objectManager }