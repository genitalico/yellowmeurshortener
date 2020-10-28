exports.MongoSettings = {
    connectionString: process.env.MONGO_CS,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    dbName: process.env.MONGO_DBNAME,
    collection: process.env.MONGO_COLLECTION
}
