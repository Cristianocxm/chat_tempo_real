const express = require('express');
const UserController = require('../4_controllers/UserController');
const UserRouter = express.Router();



UserRouter.post('/login', UserController.login); 
UserRouter.post('/users', UserController.store); // Criar um novo usuário
UserRouter.get('/users', UserController.index);  // Listar todos os usuários
UserRouter.get('/users/:id', UserController.show);  // Exibir um usuário específico
UserRouter.put('/users/:id',  UserController.update);
UserRouter.delete('/users/:id', UserController.delete);

module.exports = UserRouter;