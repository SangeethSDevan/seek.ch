const express=require("express")
const path=require("path")
const socketio=require("socket.io")
require('dotenv').config()

const PORT=process.env.PORT||8000
const app=express()

app.use(express.static(path.join(__dirname,"public")))

const server=app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

const io=socketio(server)

io.on("connection",(socket)=>{
    let name;
    let room;
    socket.on("join-room",(data)=>{
        socket.join(data.room)
        socket.emit("join-sts",`You have joined the room ${data.room}!`)
        socket.to(data.room).emit("joined",`${data.name} joined the room!`)
        name=data.name;
        room=data.room
    })

    socket.on("send-message",(data)=>{
        socket.to(data.room).emit("recieve-message",data)
    })
    socket.on("show-typing",(data)=>{
        socket.broadcast.to(data.room).emit("typing",data)
    })
    socket.on("remove-typing",(room)=>{
        socket.broadcast.to(room).emit("not-typing")
    })
    socket.on("disconnect",(data)=>{
        if(!name) name="unknown"
        if(!room) return
        socket.broadcast.to(room).emit("left-room",`${name} left the room!`)
    })
    socket.on("exit-room",()=>{
        socket.leave(room)
        socket.emit("exited")
        socket.broadcast.to(room).emit("left-room",`${name} left the room!`)
    })
})