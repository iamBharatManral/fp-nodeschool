const {listFilesForParticularExtension, printFiles} = require("./mymodule")

const FILE_PATH = process.argv[2]
const FILE_EXTENSION = process.argv[3]

listFilesForParticularExtension(FILE_PATH, FILE_EXTENSION, (err, data)=> {
    if(err){
        console.log(err)
    }else{
        printFiles(data)
    }
})
