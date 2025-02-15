import Employee from '../models/Employee';  // ✅ Import the correct model
import { IEmployee } from '../interfaces/employee.interface';

class EmployeeService {
  static async getAllEmployees() {
    return await Employee.find();  // ✅ Use Employee model, not EmployeeService
  }

  static async getEmployeeById(id: string) {
    return await Employee.findById(id);  // ✅ Corrected
  }

  static async createEmployee(data: IEmployee) {
    return await Employee.create(data);  // ✅ Corrected
  }

  static async updateEmployee(id: string, data: Partial<IEmployee>) {
    return await Employee.findByIdAndUpdate(id, data, { new: true });  // ✅ Corrected
  }

  static async deleteEmployee(id: string) {
    return await Employee.findByIdAndDelete(id);  // ✅ Corrected
  }
}

export default EmployeeService;
