const express = require("express");
const path = require("path");

const app = express();
const http = require('http').createServer(app);
const port = process.env.port || 3000;

const staticpath = path.join(__dirname,"/public");
console.log(staticpath);

app.use(express.static(staticpath))



http.listen(port,"127.0.0.1",()=>{
    console.log("Connection is created!!");
})

app.get("/",(req,res)=>{
   res.sendFile(__dirname + "/index.html")
})

// socket work

const io= require('socket.io')(http)

io.on('connection', (socket)=>{
    console.log("Connected...");

    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
})