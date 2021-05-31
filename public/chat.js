var socket=io.connect("http://localhost:400");
// GET DOM ELEMENTS
const form=document.getElementById('send-container');
const btn=document.querySelector('btn');
const messageinp=document.getElementById('messageinp');
const messagecontainer=document.querySelector('.container');

//FUNCTION WHICH WILL APPEND IN DOM
const append=(message,position)=>{
    const messageelement=document.createElement('div');
    messageelement.innerText=message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);

    messagecontainer.append(messageelement);
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();                         //it will not let page to reload
    const message=messageinp.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageinp.value='';
})


// client side will get the name of person AND LET THE SERVER KNOW
const naam=prompt('enter your name');
socket.emit('new-user-joined', naam);


//IF A NEW USER JOINS , RECEIVE THE EVENT FROM SERVER
socket.on('user-joined',naam=>{
    append(`${naam}: joined the chat`,'right');
})


// IF USER SEND A MESSAGE , RECEIVE THE EVENT FROM SERVER
socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left');
})


// IF USER LEFT , RECIEVE THE EVENT FROM SERVER
socket.on('left',naam=>{
    append(`${naam} left the chat`,'left');
})

