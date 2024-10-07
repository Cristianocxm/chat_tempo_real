const socket = io('http://localhost:3000'); // Substitua pela URL do seu servidor

const chat = document.getElementById('chat');
const messageForm = document.getElementById('messageForm');
const roomIdInput = document.getElementById('roomId');
const userIdInput = document.getElementById('userId');
const messageInput = document.getElementById('message');

// Quando o formulário é enviado
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const roomId = roomIdInput.value;
    const userId = userIdInput.value;
    const message = messageInput.value;

    // Enviar mensagem para a sala
    socket.emit('join-room', roomId); // Entrar na sala
    socket.emit('message', { roomId, userId, message }); // Enviar mensagem

    messageInput.value = ''; // Limpar campo de mensagem
});

// Quando uma nova mensagem é recebida
socket.on('message', (data) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${data.userId}: ${data.message}`;
    chat.appendChild(messageElement);
    chat.scrollTop = chat.scrollHeight; // Rolar para baixo para ver a nova mensagem
});

// Quando um usuário se conecta
socket.on('user-connected', (userId) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${userId} se conectou.`;
    chat.appendChild(messageElement);
});

// Quando um usuário se desconecta
socket.on('user-disconnected', (userId) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${userId} se desconectou.`;
    chat.appendChild(messageElement);
});
