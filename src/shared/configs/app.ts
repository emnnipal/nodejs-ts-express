import dotenv from 'dotenv';

dotenv.config();

export const { NODE_ENV = 'development', APP = '', PORT = '', LOGGER_LEVEL = 'info' } = process.env;
