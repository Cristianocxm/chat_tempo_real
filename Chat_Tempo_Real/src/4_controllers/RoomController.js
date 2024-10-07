const roomService = require('../5_services/RoomService');

class RoomController {
    async createRoom(req, res) {
        try {
            const roomData = req.body;
            const room = await roomService.createRoom(roomData);
            console.log(room)
            res.status(201).json(room);  //Retorna a sala criada
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async listRooms(req, res) {
        try {
            const rooms = await roomService.getAllRooms();
            res.status(200).json(rooms);  // Retorna a lista de salas
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async joinRoom(req, res) {
        const roomId = req.params.id;
        const userId = req.user.id; // ID do usuário autenticado

        try {
            const room = await roomService.getRoomById(roomId);

            if (!room) {
                return res.status(404).json({ message: 'Sala não encontrada' });
            }

            // Verifica se a sala está cheia e tenta adicionar o usuário
            await roomService.addUserToRoom(roomId, userId);

            //req.io.to(roomId).emit('user-connected', userId);
            //console.log(roomId + '' + userId)

            res.status(200).json({ message: `Usuário entrou na sala: ${room.name}` });
        } catch (error) {
            if (error.message === 'Sala cheia') {
                return res.status(400).json({ message: 'A sala já está cheia.' });
            }
            res.status(500).json({ message: 'Erro ao entrar na sala', error: error.message });
        }
    }

    async leaveRoom(req, res) {
        const roomId = req.params.id;
        const userId = req.user.id; // ID do usuário autenticado

        try {
            const room = await roomService.getRoomById(roomId);

            if (!room) {
                return res.status(404).json({ message: 'Sala não encontrada' });
            }

            await roomService.removeUserFromRoom(roomId, userId);

            //req.io.to(roomId).emit('user-disconnected', userId);  // Notifica a sala

            res.status(200).json({ message: `Usuário saiu da sala: ${room.name}` });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao sair da sala', error: error.message });
        }
    }
}

module.exports = new RoomController();
