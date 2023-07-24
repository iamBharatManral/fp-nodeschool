const {task} = require("folktale/concurrency/task")
const {promises} = require("fs");
const {join} = require("path");
const {tryCatchAsyncTask, numberOfLines} = require("../common/utils")

const FILE_PATH = process.argv[2]

const readFileTask = tryCatchAsyncTask(promises.readFile)

readFileTask(FILE_PATH, "utf-8")
    .run()
    .listen({
        onResolved: (text) => console.log(numberOfLines(text)),
        onCancelled: () => console.log("the task is cancelled"),
        onRejected: (err) => console.log(err)
    })


