import dotenv from 'dotenv';

dotenv.config();
export const config = {
    PORT: process.env.PORT,
    FRONTEND_HOST: process.env.FRONTEND_HOST,
    MYSQL_DATABASE_NAME: process.env.MYSQL_DATABASE_NAME,
};
