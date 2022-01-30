import dotenv from 'dotenv';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const APP = process.env.APP || '';
export const PORT = process.env.PORT || '';
export const LOGGER_LEVEL = process.env.LOGGER_LEVEL || 'info';
