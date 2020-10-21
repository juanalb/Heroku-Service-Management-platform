"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const userController_1 = require("../controllers/userController");
class UserRoutes {
    constructor() {
        this.userController = new userController_1.UserController();
    }
    route(app) {
        app.post('/api/user', (req, res) => {
            this.userController.create(req, res);
        });
        app.get('/api/user/all', (req, res) => {
            this.userController.getAll(req, res);
        });
        app.get('/api/user/:id', (req, res) => {
            this.userController.getById(req, res);
        });
        app.put('/api/user/:id', (req, res) => {
            this.userController.update(req, res);
        });
        app.delete('/api/user/:id', (req, res) => {
            this.userController.delete(req, res);
        });
    }
}
exports.UserRoutes = UserRoutes;
