"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    role: { type: String, enum: ["Service Desk employee", "Regular employee"], default: "Regular employee" },
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    password: String,
    location: { type: String, enum: ["Amsterdam", "Haarlem", "Knuppeldam", "HQ"], default: "Amsterdam" },
});
userSchema.set('toJSON', {
    virtuals: true
});
exports.default = mongoose_1.default.model('users', userSchema);
