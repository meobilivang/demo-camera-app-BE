//Config 
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, './.env') });

module.exports = {
    //Running Port
    PORT: process.env.PORT,
    //Database config
    DATABASE_CONFIG: {
        HOST: process.env.DATABASE_HOST_URL,
        USER: process.env.DATABASE_USER,
        PASSWORD: process.env.DATABASE_PASSWORD,
        DATABASE: process.env.DATABASE_NAME,
    }
}