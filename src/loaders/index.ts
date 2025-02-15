// Application bootstrap
import connectMongoDB from '../config/mongodb';
import pool from '../config/mysql';

export const initLoaders = async () => {
  await connectMongoDB();
  console.log('Loaders initialized');
};