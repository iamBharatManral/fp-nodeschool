const net = require("net")
const {createTCPServerTask} = require("../common/utils")
const PORT = process.argv[2]

const zeroFill = num => num < 10 ? `0${num}` : num

const getTime = () => {
    const now = new Date(Date.now())
    const year = now.getFullYear()
    const month = zeroFill(now.getMonth() + 1)
    const hour = zeroFill(now.getHours())
    const date = zeroFill(now.getDate())
    const minute = zeroFill(now.getMinutes())
    return `${year}-${month}-${date} ${hour}:${minute}\n`
}

const connectionListener = socket => {
    socket.end(getTime())
}

const tcpServerTask = createTCPServerTask(net.createServer)

tcpServerTask(PORT, connectionListener)
    .run()
    .listen({
        onRejected: console.error,
        onResolved: server => console.log(`Server is running on ${PORT}`)
    })


