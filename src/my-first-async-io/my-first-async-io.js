const {task} = require("folktale/concurrency/task")
const {promises} = require("fs");
const {join} = require("path");

const FILE_PATH = process.argv[2]
const tryCatchAsyncTask = fn => (...args) => {
    return task(async resolver => {
        try {
            const result = await fn(...args)
            resolver.resolve(result)
        }catch(err){
            resolver.reject(err)
        }
    })
}

const readFileTask = tryCatchAsyncTask(promises.readFile)

const readLines = text => text.split("\n").length - 1

readFileTask(FILE_PATH, "utf-8")
    .run()
    .listen({
        onResolved: (text) => console.log(readLines(text)),
        onCancelled: () => console.log("the task is cancelled"),
        onRejected: (err) => console.log(err)
    })


