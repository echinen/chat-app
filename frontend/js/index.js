var $ = jQuery;
var socket = io();

socket.on('connect', () => {
    console.log('Conectando com o servidor!')
});

socket.on('disconnect', () => {
    console.log('Desconectando com o servidor!')
});

socket.on('newMessage', (message) => {
    console.log('Nova mensagem:', message)

    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`)

    $('#messages').append(li);
});

$('#message-form').on('submit', (e) => {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, () => {

    })
});

var locationButton = $('#send-location');
locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocalização não é suportada pelo seu browser.')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, () => {
        alert('Não foi possível buscar o local.')
    })
})