const Result = require("folktale/result")
const {readFileSync} = require("fs")
const {tryCatch, numberOfLines} = require("../common/utils")

const FILE_PATH = process.argv[2]

const readFileIO = tryCatch(readFileSync)

readFileIO(FILE_PATH, {encoding: "utf-8"})
    .matchWith({
        Error: err => console.log(err),
        Ok: data => console.log(numberOfLines(data.value))
    })

