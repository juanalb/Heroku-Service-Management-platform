"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
class IncidentService {
    createIncident(incident_params, callback) {
        const _session = new schema_1.default(incident_params);
        _session.save(callback);
    }
    getAllIncidents(query, callback) {
        // console.log("incident_params", query);
        schema_1.default.find(query, callback);
    }
    getIncident(query, callback) {
        schema_1.default.findOne(query, callback);
    }
    updateIncident(incident_params, callback) {
        const query = { _id: incident_params._id };
        schema_1.default.findOneAndUpdate(query, incident_params, callback);
    }
    deleteIncident(_id, callback) {
        const query = { _id: _id };
        schema_1.default.deleteOne(query, callback);
    }
}
exports.default = IncidentService;
