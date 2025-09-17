import dotenv from 'dotenv';
import { AppError } from '../utils/AppError';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
// const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
// console.log(SECRET_KEY)
if(!SECRET_KEY){
    throw new AppError("Config file corrupted", 403)
}

export const config = {
    SECRET_KEY,
}