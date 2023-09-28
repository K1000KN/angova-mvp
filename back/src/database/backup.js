import fs from "fs";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cron from "node-cron";

dotenv.config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, { useUnifiedTopology: true });
const db = client.db();

const convertDate = (dt) => {
  const year = dt.getFullYear();
  const month = (dt.getMonth() + 1).toString().padStart(2, "0");
  const date = dt.getDate();
  return `${year}-${month}-${date}`;
};

export async function exportAllCollections() {
  try {
    const fileName =
      "./backup/backup_db_angova_" + `${convertDate(new Date())}.json`;
    await client.connect();
    const collections = await db.listCollections().toArray();
    const data = {};

    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      const collection = db.collection(collectionName);
      const documents = await collection.find().toArray();
      data[collectionName] = documents;
    }
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error exporting collections:", error);
  } finally {
    await client.close();
  }
}
cron.schedule("0 0 * * *", () => {
  exportAllCollections();
});
