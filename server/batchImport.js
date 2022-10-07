const { hotels } = require("./data");
const { pointOfInterest } = require("./data");
const { resto } = require("./data");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Final-project");

    const allHotels = await db.collection("resto").insertMany(resto);
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};
batchImport();
