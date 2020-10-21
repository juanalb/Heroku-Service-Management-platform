"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const test_routes_1 = require("./routes/test_routes");
const common_routes_1 = require("./routes/common_routes");
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = require("./routes/userRoutes");
const incidentController_1 = require("./routes/incidentController");
const cors_1 = __importDefault(require("cors"));
const path = __importStar(require("path"));
require('dotenv').config();
class App {
    constructor() {
        this.test_routes = new test_routes_1.TestRoutes();
        this.common_routes = new common_routes_1.CommonRoutes();
        this.userRoutes = new userRoutes_1.UserRoutes();
        this.incidentRoutes = new incidentController_1.IncidentRoutes();
        this.mongoUrl = process.env.MONGO_CONNECTION_STRING;
        this.app = express_1.default();
        this.config();
        this.mongoSetup();
        this.test_routes.route(this.app);
        this.userRoutes.route(this.app);
        this.incidentRoutes.route(this.app);
        this.common_routes.route(this.app);
    }
    config() {
        console.log(__dirname);
        const buildPath = path.join(__dirname, '..', 'build');
        console.log(buildPath);
        this.app.use(express_1.default.static(buildPath));
        // support application/json type post data
        this.app.use(body_parser_1.default.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(cors_1.default());
    }
    mongoSetup() {
        mongoose_1.default.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
    }
}
exports.default = new App().app;
