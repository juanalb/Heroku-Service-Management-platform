"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentRoutes = void 0;
const incidentController_1 = require("../controllers/incidentController");
class IncidentRoutes {
    constructor() {
        this.incidentController = new incidentController_1.IncidentController();
    }
    route(app) {
        app.post('/api/incident', (req, res) => {
            this.incidentController.create(req, res);
        });
        app.get('/api/incident/all', (req, res) => {
            this.incidentController.getAll(req, res);
        });
        app.get('/api/incident/:id', (req, res) => {
            this.incidentController.getById(req, res);
        });
        // app.get('/api/incident/:email', (req: Request, res: Response) => {
        //     this.incidentController.getByEmail(req, res);
        // });
        app.put('/api/incident/:id', (req, res) => {
            this.incidentController.update(req, res);
        });
        app.delete('/api/incident/:id', (req, res) => {
            this.incidentController.delete(req, res);
        });
    }
}
exports.IncidentRoutes = IncidentRoutes;
