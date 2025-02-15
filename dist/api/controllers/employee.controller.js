"use strict";
// src/api/controllers/employee.controller.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_service_1 = __importDefault(require("../../services/employee.service"));
class EmployeeController {
    static getAllEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield employee_service_1.default.getAllEmployees();
                res.status(200).json(employees);
            }
            catch (error) {
                res.status(500).json({ message: 'Error retrieving employees', error });
            }
        });
    }
    static getEmployeeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield employee_service_1.default.getEmployeeById(req.params.id);
                if (!employee) {
                    return res.status(404).json({ message: 'Employee not found' });
                }
                res.status(200).json(employee);
            }
            catch (error) {
                res.status(500).json({ message: 'Error retrieving employee', error });
            }
        });
    }
    static createEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employeeData = req.body;
                const newEmployee = yield employee_service_1.default.createEmployee(employeeData);
                res.status(201).json(newEmployee);
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating employee', error });
            }
        });
    }
    static updateEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employeeData = req.body;
                const updatedEmployee = yield employee_service_1.default.updateEmployee(req.params.id, employeeData);
                if (!updatedEmployee) {
                    return res.status(404).json({ message: 'Employee not found' });
                }
                res.status(200).json(updatedEmployee);
            }
            catch (error) {
                res.status(500).json({ message: 'Error updating employee', error });
            }
        });
    }
    static deleteEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedEmployee = yield employee_service_1.default.deleteEmployee(req.params.id);
                if (!deletedEmployee) {
                    return res.status(404).json({ message: 'Employee not found' });
                }
                res.status(200).json({ message: 'Employee deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error deleting employee', error });
            }
        });
    }
}
exports.default = EmployeeController;
