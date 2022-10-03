const {hotels} = require("./data")
const { MongoClient } = require("mongodb");
console.log(MongoClient)
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const batchImport = async() => {
    const client = new MongoClient(MONGO_URI, options)
    try {
        await client.connect()
        const db = client.db("Final-project")
         const allHotels = await db.collection("Hotels").insertMany(hotels)
         
    }catch(error){
        console.log(error)
    }finally {
        client.close()
    }

}
batchImport()