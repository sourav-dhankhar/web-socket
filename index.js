const express=require('express');
const socket=require('socket.io');
const app=express();
const port=400;

//static files
app.use(express.static('./public'));

//socket setup




const server=app.listen(port,()=>{
    console.log(`connection is at ${port}`);
})

const user={};

var io=socket(server);
io.on('connection',(socket)=>{
    console.log("connection is successful")

    // server receives from client side 
    socket.on('new-user-joined',name=>{
        user[socket.id]=name;
        // server giving back to client side about name
        socket.broadcast.emit('user-joined',name);
    })

    // server receives from client side that someone has send a message
    socket.on('send',message => {
        socket.broadcast.emit('receive',{message: message,name: user[socket.id]})
    })

    
    socket.on('disconnect',message => {
        socket.broadcast.emit('left',user[socket.id]);
        delete user[socket.id];
    })
})
