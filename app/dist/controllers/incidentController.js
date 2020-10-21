"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentController = void 0;
const service_1 = require("../modules/common/service");
const service_2 = __importDefault(require("../modules/incident/service"));
class IncidentController {
    constructor() {
        this.incidentService = new service_2.default();
    }
    create(req, res) {
        if (req.body.reportDate &&
            req.body.subject &&
            req.body.type &&
            req.body.reportedBy &&
            req.body.priority &&
            req.body.deadline &&
            req.body.description &&
            req.body.isResolved) {
            const incident_params = {
                reportDate: req.body.reportDate,
                subject: req.body.subject,
                type: req.body.type,
                reportedBy: req.body.reportedBy,
                priority: req.body.priority,
                deadline: req.body.deadline,
                description: req.body.description,
                isResolved: req.body.isResolved
            };
            this.incidentService.createIncident(incident_params, (err, incident_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse("create incident successfull", incident_data, res);
                }
            });
        }
        else {
            // error response if some fields are missing in request body
            service_1.insufficientParameters(res);
        }
    }
    getAll(req, res) {
        if (req) {
            this.incidentService.getAllIncidents(req.query, (err, incidents) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse("get incidents successfull", incidents, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    getById(req, res) {
        if (req.params.id) {
            const incident_filter = { _id: req.params.id };
            this.incidentService.getIncident(incident_filter, (err, incident_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse("get incident successfull", incident_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    update(req, res) {
        if ((req.params.id && req.body.reportDate) ||
            req.body.reportDate ||
            req.body.subject ||
            req.body.type ||
            req.body.reportedBy ||
            req.body.priority ||
            req.body.deadline ||
            req.body.description ||
            req.body.isResolved) {
            const incident_filter = { _id: req.params.id };
            this.incidentService.getIncident(incident_filter, (err, incident_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (incident_data) {
                    const incident_params = {
                        _id: incident_filter._id,
                        deadline: req.body.deadline
                            ? req.body.deadline
                            : incident_data.deadline,
                        description: req.body.description
                            ? req.body.description
                            : incident_data.description,
                        isResolved: req.body.isResolved
                            ? req.body.isResolved
                            : incident_data.isResolved,
                        priority: req.body.priority
                            ? req.body.priority
                            : incident_data.priority,
                        reportDate: req.body.reportDate
                            ? req.body.reportDate
                            : incident_data.reportDate,
                        reportedBy: req.body.reportedBy
                            ? req.body.reportedBy
                            : incident_data.reportedBy,
                        subject: req.body.subject
                            ? req.body.subject
                            : incident_data.subject,
                        type: req.body.type ? req.body.type : incident_data.type
                        // _id: incident_filter._id,
                        // email: req.body.email ? req.body.email : incident_data.email,
                        // firstName: req.body.firstName ? req.body.firstName : incident_data.firstName,
                        // lastName: req.body.lastName ? req.body.lastName : incident_data.lastName,
                        // location: req.body.location ? req.body.location : incident_data.location,
                        // password: req.body.phoneNumber ? req.body.phoneNumber : incident_data.phoneNumber,
                        // phoneNumber: req.body.password ? req.body.password : incident_data.password,
                        // role: req.body.role ? req.body.role : incident_data.role
                    };
                    this.incidentService.updateIncident(incident_params, (err) => {
                        console.log(err);
                        if (err) {
                            service_1.mongoError(err, res);
                        }
                        else {
                            service_1.successResponse("update incident successfull", incident_params, res);
                        }
                    });
                }
                else {
                    service_1.failureResponse("invalid incident", null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    delete(req, res) {
        if (req.params.id) {
            this.incidentService.deleteIncident(req.params.id, (err, delete_details) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (delete_details.deletedCount !== 0) {
                    service_1.successResponse("delete incident successful", null, res);
                }
                else {
                    service_1.failureResponse("invalid incident", null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
}
exports.IncidentController = IncidentController;
