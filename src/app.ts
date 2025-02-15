// Main Express app configuration
import express from 'express';
import employeeRoutes from './api/routes/employee.routes';

const app = express();
app.use(express.json());
app.use('/employees', employeeRoutes);

export default app;
