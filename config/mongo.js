const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://gc01_db:gc_01@geraldioo.litsmow.mongodb.net/?retryWrites=true&w=majority&appName=Geraldioo";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

const database = client.db("GC-01")

module.exports = { database }