const userService = require('../5_services/UserService');

class UserController {
    async login(req, res) {
        const { email, password } = req.body;

        try {
            const token = await userService.login(email, password);
            res.status(200).json({ token });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    async store(req, res) {
        const { name, email, password } = req.body;
        try {
            const newUser = await userService.createUser({ name, email, password });
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async index(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async show(req, res) {
        const { id } = req.params;
        try {
            const user = await userService.getUserById(id);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const { name, email, password } = req.body;
        try {
            const updatedUser = await userService.updateUser(id, { name, email, password });
            if (!updatedUser) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            const deletedUser = await userService.deleteUser(id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.status(200).json({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new UserController();
