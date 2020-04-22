
const mongodbClient = require("mongodb").MongoClient;

let client;

async function getMongodbDriver() {

  if (!client) {
    client = await mongodbClient.connect('mongodb://mongodb:27017/etl_tests', {"useNewUrlParser": true, "useUnifiedTopology": true});
  }

  return client.db();
}

async function getCollection(collectionName) {
  const db = await getMongodbDriver();
  return db.collection(collectionName);
}

async function clear() {
  const db = await getMongodbDriver();
  await Promise.all(
    [
      db.collection("insert-one").deleteMany({}),
      db.collection("insert-many").deleteMany({}),
      db.collection("update-empty").deleteMany({}),
      db.collection("update-populated").deleteMany({}),
      db.collection("upsert").deleteMany({}),
      db.collection("upsert2").deleteMany({}),
      db.collection("upsert3").deleteMany({})
    ]);
  await client.close();
}

module.exports = {
  getCollection,
  clear
};

