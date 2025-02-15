// src/api/controllers/employee.controller.ts

import { Request, Response } from 'express';
import EmployeeService from '../../services/employee.service';

interface EmployeeDTO {
  name: string;
  email: string;
  position: string;
  salary: number;
  department: string;
  date_of_joining: Date;
}

class EmployeeController {
  static async getAllEmployees(req: Request, res: Response) {
    try {
      const employees = await EmployeeService.getAllEmployees();
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving employees', error });
    }
  }

  static async getEmployeeById(req: Request, res: Response) {
    try {
      const employee = await EmployeeService.getEmployeeById(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving employee', error });
    }
  }

  static async createEmployee(req: Request, res: Response) {
    try {
      const employeeData: EmployeeDTO = req.body;
      const newEmployee = await EmployeeService.createEmployee(employeeData);
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(500).json({ message: 'Error creating employee', error });
    }
  }

  static async updateEmployee(req: Request, res: Response) {
    try {
      const employeeData: EmployeeDTO = req.body;
      const updatedEmployee = await EmployeeService.updateEmployee(req.params.id, employeeData);
      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json(updatedEmployee);
    } catch (error) {
      res.status(500).json({ message: 'Error updating employee', error });
    }
  }

  static async deleteEmployee(req: Request, res: Response) {
    try {
      const deletedEmployee = await EmployeeService.deleteEmployee(req.params.id);
      if (!deletedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting employee', error });
    }
  }
}

export default EmployeeController;
