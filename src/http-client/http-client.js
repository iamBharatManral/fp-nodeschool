const http = require("http")
const {tryCatchGetRequest, printEach} = require("../common/utils")

const URL = process.argv[2]

const getRequestTask = tryCatchGetRequest(http.get)

getRequestTask(URL)
    .run()
    .listen({
        onResolved: printEach,
        onRejected: err => console.log(err)
    })

