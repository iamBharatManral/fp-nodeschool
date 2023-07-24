const Result = require("folktale/result")
const {readFileSync} = require("fs")

const FILE_PATH = process.argv[2]

const tryCatch = fn => (...args) => {
    try {
        return Result.Ok(fn(...args))
    }catch(err){
        return Result.Error(err)
    }
}

const readFileIO = tryCatch(readFileSync)

const numberOfLines = text => text.split("\n").length - 1

readFileIO(FILE_PATH, {encoding: "utf-8"})
    .matchWith({
        Error: err => console.log(err),
        Ok: data => console.log(numberOfLines(data.value))
    })

