import dotenv from 'dotenv';

dotenv.config();

export const APP_VERSION = process.env.npm_package_version || '';

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const APP = process.env.APP || 'development';
export const PORT = process.env.PORT || 3000;

export const SWAGGER_USERNAME = process.env.SWAGGER_USERNAME || 'swagger';
export const SWAGGER_PASSWORD = process.env.SWAGGER_PASSWORD || 'password';

export const APP_AUTH_TOKEN = process.env.APP_AUTH_TOKEN || '';
export const APP_SECRET_KEY = process.env.APP_SECRET_KEY || '';
