const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocument = yaml.load('./swagger.yaml');

const express = require("express");
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');
require('dotenv').config({ path: "./src/.env" });
const path = require('path')

const connectMongo = require("./1_config/mongo");
const userRoutes = require("./2_routes/UserRoutes");
const roomRoutes = require('./2_routes/RoomRoutes');
const authenticateJWT = require('./3_middlewares/userMid');


const app = express();
const server = http.createServer(app);
const io = socketio(server);

connectMongo();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    req.io = io;
    next();
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/auth', userRoutes);
app.use('/api/rooms', authenticateJWT, roomRoutes);


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
});


const PORT = process.env.PORT || 3000; // Use a porta definida ou 3000
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  // Adicione a lógica para validar o token JWT aqui
  next();
});


io.on('connection', (socket) => {
    console.log('Novo cliente conectado', socket.id);

    socket.on('join-room', (roomId) => {
        socket.join(roomId);  // O usuário entra na sala
        console.log(`Usuário entrou na sala: ${roomId}`);
        io.to(roomId).emit('user-connected', socket.id);  // Notifica outros usuários na sala
    });

    // Evento para receber a oferta de um usuário
    socket.on('signal', (data) => {
        const { roomId, signalData, to } = data;

        // Envia o sinal para o usuário específico
        socket.to(to).emit('signal', {
            signalData: signalData,
            from: socket.id
        });
    });

    socket.on('message', (data) => {
        const { roomId, userId, message } = data;

        // Verifica se o socket está conectado na sala
        const room = io.sockets.adapter.rooms.get(roomId);

        if (room && room.has(socket.id)) {
            // O usuário está conectado à sala, então a mensagem pode ser enviada
            io.to(roomId).emit('message', { userId, message });
            console.log(`Mensagem enviada para sala ${roomId} por ${userId}: ${message}`);
        } else {
            socket.emit('error', { message: 'Você não está conectado à sala.' });
            console.log(`Tentativa de envio de mensagem sem estar conectado à sala: ${roomId}`);
        }
    });

    socket.on('leave-room', (roomId, userId) => {
        socket.leave(roomId);
        console.log(`Usuário ${userId} saiu da sala: ${roomId}`);
        io.to(roomId).emit('user-disconnected', userId); 
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectado', socket.id);
        io.emit('user-disconnected', socket.id); 
    });
});

