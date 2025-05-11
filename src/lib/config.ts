import dotenv from 'dotenv';

dotenv.config();

if (!process.env.PORT || !process.env.MONGODB_URI || !process.env.JWT_SECRET || !process.env.TOKEN_AUTH_IDENTITY) {
    console.warn('Some environment variables are missing. Ensure .env.local or .env file is properly configured.');
}

const config = {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/avain-mailer',
    MONGODB_DB: process.env.MONGODB_DB || 'avain-mailer',
    JWT_SECRET: process.env.JWT_SECRET,
    TOKEN_AUTH_IDENTITY: process.env.TOKEN_AUTH_IDENTITY,
    // NODE_ENV: process.env.NODE_NEV || 'development',
};

console.log(config);
export {config};