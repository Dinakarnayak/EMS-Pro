"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Event listeners
const events_1 = __importDefault(require("events"));
const employeeEvent = new events_1.default();
employeeEvent.on('employeeCreated', (employee) => {
    console.log('New employee created:', employee);
});
exports.default = employeeEvent;
