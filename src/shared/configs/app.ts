import dotenv from 'dotenv';

dotenv.config();

export const {
  NODE_ENV = 'development',
  APP = 'development',
  PORT = 3000,
  LOGGER_LEVEL = 'info',
} = process.env;
