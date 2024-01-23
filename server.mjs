import express from 'express'
import http from 'http'
import {Server}from "socket.io"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const  app = express()
const server=http.createServer(app)

const io=new Server(server,{
    cors:{
        origin:true
    
    }
})
app.use(express.static(path.join(__dirname,'./dist')))
io.on('connection',(socket)=>{
    
        socket.on("joined",(data)=>{
            socket.broadcast.emit('new-user',data)
        })
         socket.on('message',(data)=>{
            
        io.emit('received_message',data)
        })
  
})

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname, "./dist/index.html"));
})

server.listen(3000,()=>console.log('server listening on port'))

