const {tryCatchAsyncTask} = require("../common/utils")
const {promises} = require("fs");

const listFilesTask = tryCatchAsyncTask(promises.readdir)

const filterFiles = (files, extension) =>
    files
        .filter(file => file.match(new RegExp(`.${extension}`)))

const printFiles = files => files.forEach(file => console.log(file))

const listFilesForParticularExtension = (file_path, extension, callback) => {
    return listFilesTask(file_path, "utf-8")
        .run()
        .listen({
            onResolved: (files) => callback(null, filterFiles(files, extension)),
            onRejected: (err) => callback(err, null)
        })
}

module.exports = {
    listFilesForParticularExtension,
    printFiles
}
