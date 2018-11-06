var socket = io();

socket.on('connect', () => {
    console.log('Connected to server!')
});

/* socket.on('disconnect', () => {
    console.log('Disconnected from server!')
}); */

/* socket.emit('createMessage', {
    from: 'Eric Front',
    text: 'Hey this is a test from front.'
}) */

socket.on('newMessage', (message) => {
    console.log('newMessage', message)
})