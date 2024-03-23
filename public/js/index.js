const socket = io();


/* document.querySelector('#sendMessage').addEventListener('click',()=>{
    const message = document.querySelector('#inputMessage').value

    socket.emit('new-message',message)
})

socket.on('message',event => {
    const paragraph = document.createElement('p')
    paragraph.innerText= `${event.id}: ${event.text}`

    document.querySelector('#chat').appendChild(paragraph)
}) */