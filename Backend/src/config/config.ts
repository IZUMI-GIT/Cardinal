import dotenv from 'dotenv';
import { AppError } from '../utils/AppError';
dotenv.config();

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

if(!SECRET_KEY || !REFRESH_TOKEN_SECRET){
    throw new AppError("Config file corrupted", 403)
}

export const config = {
    SECRET_KEY,
    REFRESH_TOKEN_SECRET
}