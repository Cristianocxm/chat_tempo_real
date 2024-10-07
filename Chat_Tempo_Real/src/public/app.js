const socket = io('http://localhost:3000'); // A URL do seu servidor

// Entrar na sala
document.getElementById('join-room').onclick = function() {
    const roomId = document.getElementById('room-id').value;
    const userId = document.getElementById('user-id').value;

    // Emitir evento para entrar na sala
    socket.emit('join-room', roomId);

    // Notificar o usuário que entrou na sala
    console.log(`Usuário ${userId} entrou na sala: ${roomId}`);
};

// Escutar mensagens da sala
socket.on('message', (data) => {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML += `<p><strong>${data.userId}:</strong> ${data.message}</p>`;
});

// Enviar mensagem
document.getElementById('send-button').onclick = function() {
    const roomId = document.getElementById('room-id').value;
    const userId = document.getElementById('user-id').value;
    const message = document.getElementById('message-input').value;

    // Emitir mensagem para a sala
    socket.emit('message', { roomId: roomId, userId: userId, message: message });

    // Limpar o campo de entrada
    document.getElementById('message-input').value = '';
};

// Escutar notificações de usuários conectados
socket.on('user-connected', (userId) => {
    console.log(`Usuário conectado: ${userId}`);
});

// Escutar notificações de desconexão
socket.on('user-disconnected', (userId) => {
    console.log(`Usuário desconectado: ${userId}`);
});
