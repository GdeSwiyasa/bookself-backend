const {
    getAll,
    getDataIdbyHandler,
    addDatabyHandler,
    putDataByHandler,
    deleteDataByHandler
} = require('./handler');


const routes = [
    {
        method: "GET",
        path: "/books",
        handler: getAll,
    },
    {
        method: "GET",
        path: "/books/{id}",
        handler: getDataIdbyHandler,
    },
    {
        method: "POST",
        path: "/books",
        handler: addDatabyHandler
    },
    {
        method: "PUT",
        path: "/books/{id}",
        handler: putDataByHandler
    },
    {
        method: "DELETE",
        path: "/books/{id}",
        handler: deleteDataByHandler
    },
];

module.exports = routes;