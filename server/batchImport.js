const { hotels } = require("./data");
const { pointOfInterest } = require("./data");
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

    const allHotels = await db.collection("POI").insertMany(pointOfInterest);
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};
batchImport();
