const express = require('express');
const roomController = require('../4_controllers/RoomController');
const authMiddleware = require('../3_middlewares/userMid');

const RoomRouter = express.Router();

RoomRouter.post('/', authMiddleware, roomController.createRoom);
RoomRouter.get('/', authMiddleware, roomController.listRooms);
RoomRouter.post('/join/:id', authMiddleware, roomController.joinRoom);
RoomRouter.post('/leave/:id', authMiddleware, roomController.leaveRoom);

module.exports = RoomRouter;
