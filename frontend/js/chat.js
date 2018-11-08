const $ = jQuery;
const socket = io();

function scrollToBottom() {
    const messages = $('#messages');
    const newMessage = messages.children('li:last-child')

    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop >= scrollHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', () => {
    const params = $().deparam(window.location.search);

    console.log(params)

    socket.emit('join', params, (err) => {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error.')
        }
    })
});

socket.on('disconnect', () => {
    console.log('Desconectando com o servidor!')
});

socket.on('newMessage', (message) => {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = $('#message-template').html();
    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', (message) => {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = $('#location-message-template').html();
    const html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
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