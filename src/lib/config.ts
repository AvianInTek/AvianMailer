import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    MONGODB_DB: process.env.MONGODB_DB || 'mydatabase',
    JWT_SECRET: process.env.JWT_SECRET,
    TOKEN_AUTH_IDENTITY: process.env.TOKEN_AUTH_IDENTITY || 'mysecret',
};

