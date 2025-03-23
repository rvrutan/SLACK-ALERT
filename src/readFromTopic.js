const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);
const dbName = "aws_test";

const handler = async (event) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("posts");
    for (const record of event.Records) {
        await collection.insertOne(record);
      console.log(record, "Should be added to db");
    }
  } catch (e) {
    console.error(e);
  }   finally {
    await client.close();
  }
};

module.exports = { handler };