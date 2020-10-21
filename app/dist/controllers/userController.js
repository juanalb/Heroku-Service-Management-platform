"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const service_1 = require("../modules/common/service");
const service_2 = __importDefault(require("../modules/user/service"));
class UserController {
    constructor() {
        this.userService = new service_2.default();
    }
    create(req, res) {
        if (req.body.role &&
            req.body.firstName &&
            req.body.lastName &&
            req.body.phoneNumber &&
            req.body.email &&
            req.body.password &&
            req.body.location) {
            const user_params = {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                location: req.body.location,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                role: req.body.role
            };
            // this.userService.getUser({})
            // const userExists = this.userService.find(u => u.email === user_params.email);
            // if (userExists) {
            //   return res.status(400).json({ error: 'User already exists' })
            // }
            this.userService.createUser(user_params, (err, user_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse("create user successfull", user_data, res);
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
            this.userService.getAllUsers(null, (err, users) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    // const data: IUser = [];
                    // users.map((user) =>{
                    //
                    // })
                    // users.map(())
                    service_1.successResponse("get users successfull", users, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    getById(req, res) {
        if (req.params.id) {
            const user_filter = { _id: req.params.id };
            this.userService.getUser(user_filter, (err, user_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse("get user successfull", user_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    update(req, res) {
        if ((req.params.id && req.body.name) ||
            req.body.role ||
            req.body.firstName ||
            req.body.lastName ||
            req.body.phoneNumber ||
            req.body.email ||
            req.body.password ||
            req.body.location) {
            const user_filter = { _id: req.params.id };
            this.userService.getUser(user_filter, (err, user_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (user_data) {
                    const user_params = {
                        _id: user_filter._id,
                        email: req.body.email ? req.body.email : user_data.email,
                        firstName: req.body.firstName ? req.body.firstName : user_data.firstName,
                        lastName: req.body.lastName ? req.body.lastName : user_data.lastName,
                        location: req.body.location ? req.body.location : user_data.location,
                        password: req.body.phoneNumber ? req.body.phoneNumber : user_data.phoneNumber,
                        phoneNumber: req.body.password ? req.body.password : user_data.password,
                        role: req.body.role ? req.body.role : user_data.role
                    };
                    this.userService.updateUser(user_params, (err) => {
                        if (err) {
                            service_1.mongoError(err, res);
                        }
                        else {
                            service_1.successResponse("update user successfull", user_params, res);
                        }
                    });
                }
                else {
                    service_1.failureResponse("invalid user", null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    delete(req, res) {
        if (req.params.id) {
            this.userService.deleteUser(req.params.id, (err, delete_details) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (delete_details.deletedCount !== 0) {
                    service_1.successResponse("delete user successful", null, res);
                }
                else {
                    service_1.failureResponse("invalid user", null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
}
exports.UserController = UserController;
