import dotenv from 'dotenv';

dotenv.config();

export const APP = process.env.APP || '';
export const PORT = process.env.PORT || '';
