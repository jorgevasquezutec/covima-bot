import { google } from 'googleapis';
import * as path from 'path'
import {config} from '../config'


const file = path.join(config.GOOGLE_KEY_JSON_PATH)
const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    keyFile: file,
});

export const googleSheetsClient = google.sheets({version:'v4',auth})