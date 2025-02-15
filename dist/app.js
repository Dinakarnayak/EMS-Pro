"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Main Express app configuration
const express_1 = __importDefault(require("express"));
const employee_routes_1 = __importDefault(require("./api/routes/employee.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/employees', employee_routes_1.default);
exports.default = app;
