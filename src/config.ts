import dotenv from 'dotenv';
dotenv.config();

export const config = {
    PORT: process.env.PORT || 3000,
    MONGO_DB_URI: process.env.MONGO_DB_URI || 'mongodb://localhost:27017',
    MONGO_DB_NAME: process.env.MONGO_DB_NAME || 'whatsapp-bot',
    SPREADSHEET_ID: process.env.SPREADSHEET_ID || '1g0v2x4q3r4g3g3g3g3g3g3g3g3g3g3g3g3g3g',
    GOOGLE_KEY_JSON_PATH: process.env.GOOGLE_KEY_JSON_PATH || './google.json',
    REGISTRO_SHEET: process.env.REGISTRO_SHEET || 'Asistencia',
    ACTIVIDADES_SHEET: process.env.ACTIVIDADES_SHEET || 'Actividades',
}