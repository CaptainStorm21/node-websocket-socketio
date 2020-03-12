const { createServer } = require ("http");
const socketIO = require ('socket.io');

const server = createServer().listen(3000);
const io = socketIO (server);

io.on("connection", socket => {
    console.log(`${io.engine.clientsCount} connections`);

    socket.on("disconnect", ()=>{
        console.log(`disconnect: ${socket.id}`)
    });

    //emit socket.io events
    socket.on("chat", message => {
        console.log(`${socket.id}: ${message}`);
        io.sockets.emit("chat-message", message, socket.io)
    })
});

console.log("Socket server")