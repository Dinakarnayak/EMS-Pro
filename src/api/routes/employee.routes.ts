import { Router, Request, Response } from "express";
import asyncHandler from "express-async-handler";  
import EmployeeService from "../../services/employee.service";
import Joi from "joi";  

const router = Router();

// ✅ Employee Validation Schema
const employeeSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  position: Joi.string().min(2).max(50).required(),
  salary: Joi.number().positive().required(),
  department: Joi.string().min(2).max(50).required(),
  date_of_joining: Joi.date().required(),
});

// ✅ Get All Employees
router.get(
  "/public/employees",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const employees = await EmployeeService.getAllEmployees();
    res.status(200).json(employees); // ✅ No `return`
  })
);

// ✅ Get a Single Employee
router.get(
  "/employees/:id",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const employee = await EmployeeService.getEmployeeById(req.params.id);
    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
    } else {
      res.status(200).json(employee);
    }
  })
);

// ✅ Create Employee
router.post(
  "/employees",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { error } = employeeSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const newEmployee = await EmployeeService.createEmployee(req.body);
      res.status(201).json(newEmployee);
    }
  })
);

// ✅ Update Employee
router.put(
  "/employees/:id",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const updatedEmployee = await EmployeeService.updateEmployee(req.params.id, req.body);
    if (!updatedEmployee) {
      res.status(404).json({ error: "Employee not found" });
    } else {
      res.status(200).json({ message: "Employee updated successfully", updatedEmployee });
    }
  })
);

// ✅ Delete Employee
router.delete(
  "/employees/:id",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const deletedEmployee = await EmployeeService.deleteEmployee(req.params.id);
    if (!deletedEmployee) {
      res.status(404).json({ error: "Employee not found" });
    } else {
      res.status(200).json({ message: "Employee deleted successfully" });
    }
  })
);

export default router;
