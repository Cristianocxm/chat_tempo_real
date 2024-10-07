const roomRepository = require('../6_repositories/RoomRepository');

class RoomService {
    async createRoom(roomData) {
        return await roomRepository.create(roomData);
    }

    async getAllRooms() {
        return await roomRepository.findAll();
    }

    async getRoomById(id) {
        return await roomRepository.getRoomById(id);
    }

    async addUserToRoom(roomId, userId) {
        const isFull = await roomRepository.isRoomFull(roomId);
        if (isFull) {
            throw new Error('Sala cheia');
        }
        return roomRepository.addUserToRoom(roomId, userId);
    }

    async removeUserFromRoom(roomId, userId) {
        const room = await roomRepository.getRoomById(roomId);
        if (!room) throw new Error('Sala não encontrada');
        
        await roomRepository.removeUserFromRoom(roomId, userId);
    }

}

module.exports = new RoomService();
