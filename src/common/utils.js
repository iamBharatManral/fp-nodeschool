const {task} = require("folktale/concurrency/task");
const Result = require("folktale/result");

const tryCatchAsyncTask = fn => (...args) => {
    return task(async resolver => {
        try {
            const result = await fn(...args)
            resolver.resolve(result)
        }catch(err) {
            resolver.reject(err)
        }
    })
}

const tryCatch = fn => (...args) => {
    try {
        return Result.Ok(fn(...args))
    }catch(err){
        return Result.Error(err)
    }
}

const numberOfLines = text => text.split("\n").length - 1

module.exports = {
    tryCatch,
    tryCatchAsyncTask,
    numberOfLines
}
