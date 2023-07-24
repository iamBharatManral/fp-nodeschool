const {tryCatchAsyncTask} = require("../common/utils")
const {promises} = require("fs");

const listFilesTask = tryCatchAsyncTask(promises.readdir)
const FILE_PATH = process.argv[2]
const FILE_EXTENSION = process.argv[3]

const filterFiles = files =>
    files
        .filter(file => file.match(new RegExp(`.${FILE_EXTENSION}`)))

const printFiles = files => files.forEach(file => console.log(file))

listFilesTask(FILE_PATH, "utf-8")
    .run()
    .listen({
        onResolved: (files) => printFiles(filterFiles(files)),
        onRejected: (err) => console.error(err)
    })
