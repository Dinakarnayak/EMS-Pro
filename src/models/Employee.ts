import mongoose, { Schema, Document } from 'mongoose';
import { IEmployee } from '../interfaces/employee.interface';

interface IEmployeeModel extends IEmployee, Document {}

const EmployeeSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true },
  department: { type: String, required: true },
  date_of_joining: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model<IEmployeeModel>('Employee', EmployeeSchema);
