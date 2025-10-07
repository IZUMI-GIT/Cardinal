import dotenv from 'dotenv';
import { AppError } from '../utils/AppError';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

if(!SECRET_KEY){
    throw new AppError("no secret_key",403)
}

export const config = {
    SECRET_KEY,
}