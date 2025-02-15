import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import mysql from "mysql2/promise"; // ✅ Import MySQL
import employeeRoutes from "./api/routes/employee.routes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydb";

// ✅ Create MySQL Connection
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "Root123",
  database: process.env.MYSQL_DATABASE || "employee_management",
  port: Number(process.env.MYSQL_PORT) || 3306,
});

// ✅ Check MySQL Connection
const checkMySQL = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping(); // Check if MySQL is alive
    connection.release();
    return "Connected";
  } catch (error) {
    console.error("❌ MySQL Connection Error:", error);
    return "Disconnected";
  }
};

// ✅ Check MongoDB Connection
const checkMongoDB = () => {
  const mongoState = mongoose.connection.readyState;
  const status = ["Disconnected", "Connected", "Connecting", "Disconnecting"];
  return status[mongoState] || "Unknown";
};

// ✅ Database Health Check Route (For Postman)
app.get("/api/db-status", async (req, res) => {
  const mysqlStatus = await checkMySQL();
  const mongoStatus = checkMongoDB();

  res.json({
    mysql: mysqlStatus,
    mongodb: mongoStatus,
  });
});

// ✅ Connect to MongoDB Before Starting the Server
const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

// ✅ Start Server Only If MongoDB Connects
connectMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("Employee Management System API is running!");
});

// ✅ Use Employee Routes
app.use("/api", employeeRoutes);
