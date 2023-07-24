const {task} = require("folktale/concurrency/task");
const Result = require("folktale/result");
const {result} = require("folktale");

const tryCatchAsyncTask = fn => (...args) => {
    return task(async resolver => {
        try {
            const result = await fn(...args)
            resolver.resolve(result)
        }catch(err) {
            console.log("error my")
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

const tryCatchGetRequest = fn => (...args) => {
    return task(async resolver => {
        const req = fn(...args, res => {
            let data = []
            res.on("data", chunk => {
                data.push(chunk.toString())
            })
            res.on("end", () => {
                resolver.resolve(data)
            })
        })
        req.on("error", err =>{
            resolver.reject(err)
        })
        req.end()
    })
}
const numberOfLines = text => text.split("\n").length - 1

const printEach = arr => arr.forEach(text => console.log(text))


module.exports = {
    tryCatch,
    tryCatchAsyncTask,
    numberOfLines,
    tryCatchGetRequest,
    printEach
}
