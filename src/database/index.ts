import { MongoAdapter as Database } from '@builderbot/database-mongo'
import { config } from '../config'

export  const adapterDB = new Database({
        dbUri: config.MONGO_DB_URI,
        dbName: config.MONGO_DB_NAME,
})