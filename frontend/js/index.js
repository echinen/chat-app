const $ = jQuery;
const socket = io();

socket.on('connect', () => {
    console.log('Conectando com o servidor!')
});

socket.on('disconnect', () => {
    console.log('Desconectando com o servidor!')
});

socket.on('newMessage', (message) => {
    console.log('Nova mensagem:', message)

    const li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`)

    $('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
const li = $('<li></li>');
const a = $('<a target="_blank">Minha atual localização</a>');

li.text(`${message.from}: `);
a.attr('href', message.url);
li.append(a);
$('#messages').append(li);
})

$('#message-form').on('submit', (e) => {
    e.preventDefault();

    const messageTextBox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, () => {
        messageTextBox.val('')
    })
});

const locationButton = $('#send-location');
locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocalização não é suportada pelo seu browser.')
    }

    locationButton.attr('disabled', 'disabled').text('Enviando localização...');

    navigator.geolocation.getCurrentPosition((position) => {
        locationButton.removeAttr('disabled').text('Enviando localização');

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, () => {
        locationButton.removeAttr('disabled').text('Enviando localização');

        alert('Não foi possível buscar o local.')
    })
})