"use strict";
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
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler")); // ✅ Import express-async-handler
const employee_service_1 = __importDefault(require("../../services/employee.service"));
const joi_1 = __importDefault(require("joi")); // ✅ Import Joi for inline DTO validation
const router = (0, express_1.Router)();
// ✅ Inline DTO Validation Schema
const employeeSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(50).required(),
    email: joi_1.default.string().email().required(),
    position: joi_1.default.string().min(2).max(50).required(),
    salary: joi_1.default.number().positive().required(),
    department: joi_1.default.string().min(2).max(50).required(),
    date_of_joining: joi_1.default.date().required(),
});
// ✅ Get All Employees
router.get("/public/employees", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employees = yield employee_service_1.default.getAllEmployees();
    res.json(employees);
})));
// ✅ Get a Single Employee
router.get("/employees/:id", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield employee_service_1.default.getEmployeeById(req.params.id);
    if (!employee)
        return res.status(404).json({ error: "Employee not found" });
    res.json(employee);
})));
// ✅ Create Employee
router.post("/employees", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = employeeSchema.validate(req.body);
    if (error)
        return res.status(400).json({ error: error.details[0].message });
    const newEmployee = yield employee_service_1.default.createEmployee(req.body);
    res.status(201).json(newEmployee);
})));
// ✅ Update Employee
router.put("/employees/:id", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedEmployee = yield employee_service_1.default.updateEmployee(req.params.id, req.body);
    if (!updatedEmployee)
        return res.status(404).json({ error: "Employee not found" });
    res.json({ message: "Employee updated successfully", updatedEmployee });
})));
// ✅ Delete Employee
router.delete("/employees/:id", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedEmployee = yield employee_service_1.default.deleteEmployee(req.params.id);
    if (!deletedEmployee)
        return res.status(404).json({ error: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
})));
exports.default = router;
