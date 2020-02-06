import * as dotenv from 'dotenv';
dotenv.config()

export default {
  APP: process.env.APP || 'development',
  PORT: process.env.PORT || '3001',
  AUTHORIZATION_KEY: process.env.AUTHORIZATION_KEY || ''
}