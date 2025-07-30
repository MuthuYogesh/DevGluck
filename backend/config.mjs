import dotenv from 'dotenv';

dotenv.config();

const mongodb = process.env.MongoDB;
const PORT = process.env.PORT;
const secretMessage = process.env.secretMessage;
const feUrlDev = process.env.FRONTEND_URL_DEV;
const feUrlProd = process.env.FRONTEND_URL_PROD

export {
    feUrlDev,
    feUrlProd,
    mongodb,
    PORT,
    secretMessage
}